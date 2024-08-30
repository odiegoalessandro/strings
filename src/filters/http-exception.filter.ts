import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const message =
      typeof response === 'object' && response['message']
        ? response['message']
        : exception.message;

    response.status(status).json({
      path: request.url,
      statusCode: status,
      timestamp: new Date().toISOString(),
      message,
    });
  }
}
