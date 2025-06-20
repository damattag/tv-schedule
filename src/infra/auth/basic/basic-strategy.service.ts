import { HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { BasicStrategy as Strategy } from 'passport-http';
import { z } from 'zod';
import { DefaultException } from '@/core/exceptions';
import { EnvService } from '@/infra/env';

const basicAuthRequestSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type BasicAuthRequest = z.infer<typeof basicAuthRequestSchema>;

@Injectable()
export class BasicStrategyService extends PassportStrategy(Strategy) {
  private username: string;
  private password: string;

  constructor(private readonly envService: EnvService) {
    super({
      passReqToCallback: true,
    });

    this.username = this.envService.get('BASIC_USER');
    this.password = this.envService.get('BASIC_PASS');
  }

  public validate(input: any): boolean {
    const authHeader = input.headers.authorization;

    const token = authHeader.replace('Basic ', '');

    const authString = `${this.username}:${this.password}`;

    const auth = Buffer.from(authString).toString('base64');

    if (auth === token) {
      return true;
    }

    throw new DefaultException({
      message: 'Invalid credentials',
      status: HttpStatus.UNAUTHORIZED,
      code: 'INVALID_CREDENTIALS',
    });
  }
}
