import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { prismaErrorCodes } from '@/infra/database/prisma/exceptions';

@Catch(PrismaClientKnownRequestError)
export class PrismaFilter implements ExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const errorCode = prismaErrorCodes.find(
      (error) => error.errorCode === exception.code,
    );

    const status = errorCode?.httpStatus ?? HttpStatus.INTERNAL_SERVER_ERROR;

    const message = exception.message;

    const code = exception.name;

    const timestamp = new Date().toISOString();

    response.status(status).json({
      status,
      code,
      message,
      data: exception.meta,
      timestamp,
    });
  }
}
