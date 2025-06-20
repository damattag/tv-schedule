import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@/core/exceptions';
import {
  BannerRepository,
  ProgramRepository,
} from '@/domain/programs/application/repositories';

interface DeleteProgramRequest {
  id: string;
}

type DeleteProgramResponse = void;

@Injectable()
export class DeleteProgramUseCase {
  constructor(
    private readonly programRepository: ProgramRepository,
    private readonly bannerRepository: BannerRepository,
  ) {}

  async execute(input: DeleteProgramRequest): Promise<DeleteProgramResponse> {
    const { id } = input;

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

    if (program.bannerId) {
      const currentBanner = await this.bannerRepository.findById(
        program.bannerId.toString(),
      );

      if (currentBanner) {
        await this.bannerRepository.delete(currentBanner.id.toString());
      }
    }

    return this.programRepository.delete(id);
  }
}
