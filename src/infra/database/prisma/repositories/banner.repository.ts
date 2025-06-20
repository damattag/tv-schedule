import { Injectable } from '@nestjs/common';
import { BannerRepository } from '@/domain/programs/application/repositories';
import { BannerEntity } from '@/domain/programs/enterprise/entities';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { BannerMapper } from '../mappers';

@Injectable()
export class PrismaBannerRepository implements BannerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(banner: BannerEntity): Promise<void> {
    const data = BannerMapper.toPrisma(banner);

    await this.prisma.banner.create({ data });
  }

  async findById(id: string): Promise<BannerEntity | null> {
    const banner = await this.prisma.banner.findUnique({ where: { id } });

    if (!banner) {
      return null;
    }

    return BannerMapper.toDomain(banner);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.banner.delete({ where: { id } });
  }
}
