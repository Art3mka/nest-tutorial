import {
    Injectable,
    ConflictException,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { RegisterRequest } from './dto/register.dto';
import { hash, verify } from 'argon2';
import type { JwtPayload } from './interfaces/jwt.interface';
import { LoginRequest } from './dto/login.dto';
import type { Request, Response } from 'express';
import { isDev } from 'src/utils/is-dev.util';

@Injectable()
export class AuthService {
    private readonly JWT_ACCESS_TOKEN_EXPIRATION: JwtSignOptions['expiresIn'];
    private readonly JWT_REFRESH_TOKEN_EXPIRATION: JwtSignOptions['expiresIn'];
    private readonly COOKIE_DOMAIN: string;

    constructor(
        private readonly prismaService: PrismaService,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
    ) {
        this.JWT_ACCESS_TOKEN_EXPIRATION = this.configService.getOrThrow<
            JwtSignOptions['expiresIn']
        >('JWT_ACCESS_TOKEN_EXPIRATION');
        this.JWT_REFRESH_TOKEN_EXPIRATION = this.configService.getOrThrow<
            JwtSignOptions['expiresIn']
        >('JWT_REFRESH_TOKEN_EXPIRATION');
        this.COOKIE_DOMAIN =
            this.configService.getOrThrow<string>('COOKIE_DOMAIN');
    }

    async register(res: Response, registerRequest: RegisterRequest) {
        const { name, email, password } = registerRequest;

        const existUser = await this.prismaService.user.findUnique({
            where: {
                email,
            },
        });

        if (existUser) {
            throw new ConflictException('User already exists');
        }

        const user = await this.prismaService.user.create({
            data: {
                name,
                email,
                password: await hash(password),
            },
        });

        return this.auth(res, user.id);
    }

    async login(res: Response, loginRequest: LoginRequest) {
        const { email, password } = loginRequest;

        const user = await this.prismaService.user.findUnique({
            where: {
                email,
            },
            select: {
                id: true,
                password: true,
            },
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const isPasswordValid = await verify(user.password, password);

        if (!isPasswordValid) {
            throw new NotFoundException('User not found');
        }

        return this.auth(res, user.id);
    }

    async refresh(req: Request, res: Response) {
        const refreshToken = req.cookies['refreshToken'];

        if (!refreshToken) {
            throw new UnauthorizedException('Refresh token not found');
        }

        const payload: JwtPayload =
            await this.jwtService.verifyAsync(refreshToken);

        if (payload) {
            const user = await this.prismaService.user.findUnique({
                where: {
                    id: payload.userId,
                },
                select: {
                    id: true,
                },
            });

            if (!user) {
                throw new NotFoundException('User not found');
            }

            return this.auth(res, user.id);
        }
    }

    async logout(res: Response) {
        this.setCookie(res, 'refreshToken', new Date(0));

        return true;
    }

    async validateUser(userId: string) {
        const user = await this.prismaService.user.findUnique({
            where: {
                id: userId,
            },
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    private auth(res: Response, userId: string) {
        const { accessToken, refreshToken } = this.generateTokens(userId);

        this.setCookie(
            res,
            refreshToken,
            new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        );

        return {
            accessToken,
        };
    }

    private generateTokens(userId: string) {
        const payload: JwtPayload = {
            userId,
        };

        const accessToken = this.jwtService.sign(payload, {
            expiresIn: this.JWT_ACCESS_TOKEN_EXPIRATION,
        });
        const refreshToken = this.jwtService.sign(payload, {
            expiresIn: this.JWT_REFRESH_TOKEN_EXPIRATION,
        });

        return {
            accessToken,
            refreshToken,
        };
    }

    private setCookie(res: Response, value: string, expires: Date) {
        res.cookie('refreshToken', value, {
            httpOnly: true,
            domain: this.COOKIE_DOMAIN,
            expires,
            secure: !isDev(this.configService),
            sameSite: isDev(this.configService) ? 'none' : 'lax',
        });
    }
}
