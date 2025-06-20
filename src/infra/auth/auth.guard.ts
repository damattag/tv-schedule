import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DefaultException } from '@/core/exceptions';
import { BasicStrategyService } from './basic';
import { IS_PUBLIC_KEY } from './public.decorator';

@Injectable()
export class AppAuthGuard implements CanActivate {
  constructor(
    private basicStrategy: BasicStrategyService,
    private reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | any {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const { headers } = request;

    const token = headers['authorization'];

    if (token) {
      const tokenWithoutBasic = token.replace('Basic ', '');

      const tokenMatch = this.basicStrategy.validate(request);

      if (!tokenMatch) {
        throw new DefaultException({
          message: 'Invalid credentials',
          status: HttpStatus.UNAUTHORIZED,
          code: 'INVALID_CREDENTIALS',
        });
      }

      request.accessToken = tokenWithoutBasic;
      request.userName = tokenMatch['name'];

      request.email = tokenMatch['email'];

      return true;
    }
  }
}
