import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { EnvModule } from '@/infra/env';
import { BasicStrategyService } from './basic';

@Module({
  imports: [EnvModule, PassportModule],
  providers: [BasicStrategyService],
  exports: [BasicStrategyService],
})
export class AuthModule {}
