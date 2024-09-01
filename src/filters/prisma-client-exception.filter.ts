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

  private readonly errorCodeToMessage: Record<string, string> = {
    P1000: 'The service is currently unavailable. Please try again later.',
    P1001: 'Unable to reach the database. Please try again later.',
    P1002: 'The request to the database timed out. Please try again later.',
    P1003: 'The specified database does not exist.',
    P1008: 'The request took too long to process. Please try again later.',
    P1010:
      'Failed to authenticate with the database. Please check your credentials.',
    P1011:
      'There was an error processing your request. Please try again later.',
    P2002:
      'A record with the same value already exists. Please use a different value.',
  };

  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      this.errorCodeToStatus[exception.code] ||
      HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      this.errorCodeToMessage[exception.code] ||
      'An unexpected error occurred. Please try again later.';

    response.status(status).json({
      data: null,
      error: {
        path: request.url,
        message,
      },
    });
  }
}
