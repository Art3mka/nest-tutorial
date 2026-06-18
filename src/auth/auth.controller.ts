import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Get,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequest } from './dto/register.dto';
import { LoginRequest } from './dto/login.dto';
import type { Request, Response } from 'express';
import {
    ApiOperation,
    ApiOkResponse,
    ApiConflictResponse,
    ApiBadRequestResponse,
    ApiNotFoundResponse,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthResponse } from './dto/auth.dto';
import { Authorization } from './decorators/authorization.decorator';
import { Authorized } from './decorators/authorized.decorator';
import type { User } from 'src/generated/prisma/client';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOperation({
        summary: 'Register a new user',
        description: 'Register a new user with the given email and password',
    })
    @ApiOkResponse({
        type: AuthResponse,
    })
    @ApiConflictResponse({
        description: 'The user already exists',
    })
    @ApiBadRequestResponse({
        description: 'The request is invalid',
    })
    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async register(
        @Res({ passthrough: true }) res: Response,
        @Body() registerRequest: RegisterRequest,
    ) {
        return this.authService.register(res, registerRequest);
    }

    @ApiOperation({
        summary: 'Login a user',
        description: 'Login a user with the given email and password',
    })
    @ApiOkResponse({
        type: AuthResponse,
    })
    @ApiBadRequestResponse({
        description: 'The request is invalid',
    })
    @ApiNotFoundResponse({
        description: 'The user not found',
    })
    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(
        @Res({ passthrough: true }) res: Response,
        @Body() loginRequest: LoginRequest,
    ) {
        return this.authService.login(res, loginRequest);
    }

    @ApiOperation({
        summary: 'Refresh a user token',
        description: 'Refresh a user token with the given refresh token',
    })
    @ApiOkResponse({
        type: AuthResponse,
    })
    @ApiUnauthorizedResponse({
        description: 'The refresh token is invalid',
    })
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    async refresh(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
    ) {
        return this.authService.refresh(req, res);
    }

    @ApiOperation({
        summary: 'Logout a user',
        description: 'Logout a user with the given refresh token',
    })
    @ApiOkResponse({
        description: 'The user has been logged out successfully',
    })
    @Post('logout')
    @HttpCode(HttpStatus.OK)
    async logout(@Res({ passthrough: true }) res: Response) {
        return this.authService.logout(res);
    }

    @ApiOperation({
        summary: 'Get the current user',
        description: 'Get the current user with the given access token',
    })
    @ApiOkResponse({
        schema: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                email: { type: 'string' },
                name: { type: 'string' },
            },
        },
    })
    @ApiUnauthorizedResponse({
        description: 'The access token is invalid',
    })
    @Authorization()
    @Get('me')
    @HttpCode(HttpStatus.OK)
    async me(@Authorized() user: User) {
        return user;
    }
}
