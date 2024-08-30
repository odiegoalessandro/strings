import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
} from '@prisma/client/runtime/library';
import { Request, Response } from 'express';

@Catch(PrismaClientKnownRequestError, PrismaClientUnknownRequestError)
export class PrismaClientExceptionFilter implements ExceptionFilter {
  private readonly errorCodeToStatus: Record<string, HttpStatus> = {
    P1000: HttpStatus.SERVICE_UNAVAILABLE,
    P1001: HttpStatus.SERVICE_UNAVAILABLE,
    P1002: HttpStatus.SERVICE_UNAVAILABLE,
    P1003: HttpStatus.SERVICE_UNAVAILABLE,
    P1008: HttpStatus.GATEWAY_TIMEOUT,
    P1010: HttpStatus.SERVICE_UNAVAILABLE,
    P1011: HttpStatus.BAD_GATEWAY,
    P2002: HttpStatus.CONFLICT,
  };

  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const message = exception.message.replace(/\n/g, '');

    const status =
      this.errorCodeToStatus[exception.code] ||
      HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      data: null,
      error: {
        path: request.url,
        message,
      },
    });
  }
}
