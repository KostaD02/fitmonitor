import { ExceptionStatusKeys } from '@monotor/interfaces';
import { Logger, LoggerSide } from '@monotor/util';
import {
  Catch,
  HttpException,
  ExceptionFilter,
  ArgumentsHost,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionsFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const expections = [
      'HttpException',
      'NotFoundException',
      'BadRequestException',
      'UnauthorizedException',
    ];
    const isHttpException = expections.includes(exception.name);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = isHttpException
      ? (exception as HttpException)?.getStatus()
      : 500;

    const exceptionResponse: {
      message: string | string[];
      error: string;
    } = {
      error: exception.message,
      message: ExceptionStatusKeys.InternalServerError,
    };

    if (isHttpException) {
      const data = (exception as HttpException).getResponse() as {
        message: string | string[];
        error: string;
        statusCode: number;
      };
      exceptionResponse.error = data.error;
      exceptionResponse.message = data.message;
    } else {
      Logger.error(
        `At endpoint: ${request.url}\n${exception.stack}`,
        LoggerSide.Server,
      );
    }

    if (exceptionResponse.message.includes('JSON at')) {
      exceptionResponse.message = 'Invalid JSON format, check your body';
    }

    response.status(status).json({
      error: exceptionResponse.error,
      errorKeys: exceptionResponse.message,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      help: 'if you think this error should not happen, please create new issue at: https://github.com/KostaD02/monotor/issues',
    });
  }
}
