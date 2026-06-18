import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Req,
    Res,
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
}
