import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { UniqueEntityId } from '@/core/entities';
import { BannerEntity } from '@/domain/programs/enterprise/entities';
import { BannerMapper } from '@/infra/database/prisma/mappers';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

export function makeBanner(override: Partial<BannerEntity> = {}): BannerEntity {
  return BannerEntity.create({
    name: faker.lorem.word(),
    type: faker.helpers.arrayElement(['image/png', 'image/jpeg']),
    base64: Buffer.from(faker.lorem.word()).toString('base64'),
    programId: new UniqueEntityId(faker.string.uuid()),
    ...override,
  });
}

@Injectable()
export class BannerFactory {
  constructor(private readonly prisma: PrismaService) {}

  async makePrisma(data: Partial<BannerEntity> = {}): Promise<BannerEntity> {
    const banner = makeBanner(data);

    await this.prisma.banner.create({
      data: BannerMapper.toPrisma(banner),
    });

    return banner;
  }
}
