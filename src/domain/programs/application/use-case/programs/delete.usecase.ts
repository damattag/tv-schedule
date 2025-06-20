import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@/core/exceptions';
import { ProgramRepository } from '@/domain/programs/application/repositories';

interface DeleteProgramRequest {
  id: string;
}

type DeleteProgramResponse = void;

@Injectable()
export class DeleteProgramUseCase {
  constructor(private readonly programRepository: ProgramRepository) {}

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

    return this.programRepository.delete(id);
  }
}
