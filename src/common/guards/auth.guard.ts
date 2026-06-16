import {
    type CanActivate,
    Injectable,
    type ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest() as Request;

        const token = request.headers.authorization?.split(' ')[1];

        if (!token) {
            throw new UnauthorizedException('Вы не авторизованы');
        }

        return true;
    }
}
