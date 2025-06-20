import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const env = process.env.NODE_ENV;
    super({
      log: env !== 'production' ? ['warn', 'error'] : [],
    });
  }
  onModuleInit() {
    this.$connect();
    Logger.log('Database connected 📦', 'PrismaService');
  }

  onModuleDestroy() {
    this.$disconnect();
  }
}
