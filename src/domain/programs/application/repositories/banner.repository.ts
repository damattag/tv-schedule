import { BannerEntity } from '@/domain/programs/enterprise/entities';

export abstract class BannerRepository {
  abstract create(banner: BannerEntity): Promise<void>;
  abstract findById(id: string): Promise<BannerEntity | null>;
  abstract findByProgramId(programId: string): Promise<BannerEntity | null>;
  abstract delete(id: string): Promise<void>;
}
