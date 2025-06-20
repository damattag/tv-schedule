import { Module } from '@nestjs/common';
import {
  BannerRepository,
  ProgramRepository,
} from '@/domain/programs/application/repositories';
import { PrismaService } from './prisma/prisma.service';
import { PrismaBannerRepository } from './prisma/repositories/banner.repository';
import { PrismaProgramRepository } from './prisma/repositories/program.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: ProgramRepository,
      useClass: PrismaProgramRepository,
    },
    {
      provide: BannerRepository,
      useClass: PrismaBannerRepository,
    },
  ],
  exports: [PrismaService, ProgramRepository, BannerRepository],
})
export class DatabaseModule {}
