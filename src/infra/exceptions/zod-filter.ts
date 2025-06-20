import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { ZodError } from 'zod';

@Catch(ZodError)
export class ZodFilter implements ExceptionFilter {
  catch(exception: ZodError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = HttpStatus.BAD_REQUEST;

    const message = exception.flatten().fieldErrors;

    return response.status(status).json({
      status,
      code: 'ZOD_ERROR',
      message,
      data: {
        body: request.body,
      },
      timestamp: new Date().toISOString(),
    });
  }
}
