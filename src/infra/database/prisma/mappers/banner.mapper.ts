import { Banner, Prisma } from '@prisma/client';
import { UniqueEntityId } from '@/core/entities';
import { BannerEntity } from '@/domain/programs/enterprise/entities';

export class BannerMapper {
  static toDomain(raw: Banner): BannerEntity {
    return BannerEntity.create(
      {
        name: raw.name,
        type: raw.type,
        base64: raw.base64,
        programId: new UniqueEntityId(raw.programId),
        createdAt: new Date(raw.createdAt),
        updatedAt: raw.updatedAt ? new Date(raw.updatedAt) : undefined,
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toPrisma(banner: BannerEntity): Prisma.BannerUncheckedCreateInput {
    return {
      id: banner.id.toString(),
      name: banner.name,
      type: banner.type,
      base64: banner.base64,
      programId: banner.programId.toString(),
      createdAt: banner.createdAt,
      updatedAt: banner.updatedAt ?? undefined,
    };
  }
}
