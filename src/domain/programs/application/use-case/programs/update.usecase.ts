import { Injectable, NotFoundException } from '@nestjs/common';
import { FileInput } from '@/core/types/file';
import {
  BannerRepository,
  ProgramRepository,
} from '@/domain/programs/application/repositories';
import { BannerEntity } from '@/domain/programs/enterprise/entities';

interface UpdateProgramRequest {
  id: string;
  name: string;
  description: string;
  initialDate: Date;
  finalDate: Date;
  banner?: FileInput;
}

type UpdateProgramResponse = void;

@Injectable()
export class UpdateProgramUseCase {
  constructor(
    private readonly programRepository: ProgramRepository,
    private readonly bannerRepository: BannerRepository,
  ) {}

  async execute(input: UpdateProgramRequest): Promise<UpdateProgramResponse> {
    const { id, name, description, initialDate, finalDate, banner } = input;

    const program = await this.programRepository.findById(id);

    if (!program) {
      throw new NotFoundException({
        message: 'Program not found',
        code: 'PROGRAM_NOT_FOUND',
        data: {
          id,
        },
      });
    }

    program.name = name;
    program.description = description;
    program.initialDate = initialDate;
    program.finalDate = finalDate;

    const currentBanner = await this.bannerRepository.findByProgramId(id);

    if (currentBanner) {
      await this.bannerRepository.delete(currentBanner.id.toString());
    }

    if (banner) {
      const base64 = banner.buffer.toString('base64');

      const bannerEntity = BannerEntity.create({
        name: banner.name,
        type: banner.type,
        base64,
        programId: program.id,
      });

      await this.bannerRepository.create(bannerEntity);
    }

    await this.programRepository.update(program);
  }
}
