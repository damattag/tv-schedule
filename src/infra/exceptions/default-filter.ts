import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { DefaultException } from '@/core/exceptions';

@Catch(DefaultException)
export class DefaultFilter implements ExceptionFilter {
  catch(exception: DefaultException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status = exception.status;

    const timestamp = new Date().toISOString();

    response.status(status).json({
      status,
      code: exception.code,
      message: exception.message,
      data: exception.data,
      timestamp,
    });
  }
}
