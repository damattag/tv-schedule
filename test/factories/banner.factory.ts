import { faker } from '@faker-js/faker';
import { BannerEntity } from '@/domain/programs/enterprise/entities';

export function makeBanner(override: Partial<BannerEntity> = {}): BannerEntity {
  return BannerEntity.create({
    name: faker.lorem.word(),
    type: faker.system.mimeType(),
    base64: Buffer.from(faker.lorem.word()).toString('base64'),
    ...override,
  });
}
