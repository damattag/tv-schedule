import { Injectable } from '@nestjs/common';
import { EnvService } from '@/infra/env';

@Injectable()
export class BasicTokenFactory {
  constructor(private readonly envService: EnvService) {}

  makeToken(): string {
    const user = this.envService.get('BASIC_USER');
    const pass = this.envService.get('BASIC_PASS');

    return Buffer.from(`${user}:${pass}`).toString('base64');
  }
}
