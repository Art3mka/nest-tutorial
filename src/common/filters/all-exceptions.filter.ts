import {
    ArgumentsHost,
    Catch,
    HttpException,
    HttpStatus,
    Logger,
    type ExceptionFilter,
} from '@nestjs/common';
import type { Request, Response } from 'express';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionFilter.name);
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>() as Response;

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;
        const message =
            exception instanceof HttpException
                ? exception.getResponse()
                : 'Internal server error';

        this.logger.error(message);
        response.status(status).json({
            status,
            message,
            timestamp: new Date().toISOString(),
            path: ctx.getRequest<Request>().originalUrl,
        });
    }
}
