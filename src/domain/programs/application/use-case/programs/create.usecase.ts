import { Injectable } from '@nestjs/common';
import { ConflictException } from '@/core/exceptions';
import { FileInput } from '@/core/types/file';
import {
  BannerRepository,
  ProgramRepository,
} from '@/domain/programs/application/repositories';
import {
  BannerEntity,
  ProgramEntity,
} from '@/domain/programs/enterprise/entities';

interface CreateProgramRequest {
  name: string;
  description: string;
  initialDate: Date;
  finalDate: Date;
  banner?: FileInput;
}

type CreateProgramResponse = void;

@Injectable()
export class CreateProgramUseCase {
  constructor(
    private readonly programRepository: ProgramRepository,
    private readonly bannerRepository: BannerRepository,
  ) {}

  async execute(input: CreateProgramRequest): Promise<CreateProgramResponse> {
    const { initialDate, finalDate, banner } = input;

    const program = ProgramEntity.create(input);

    const alreadyExists = await this.programRepository.list({
      initialDate,
      finalDate,
    });

    if (alreadyExists.length) {
      throw new ConflictException({
        message: 'Program already exists in this date',
        code: 'PROGRAM_DATE_CONFLICT',
        data: {
          initialDate,
          finalDate,
        },
      });
    }

    await this.programRepository.create(program);

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
  }
}
