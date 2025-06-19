import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@/core/exceptions';
import { ProgramRepository } from '@/domain/programs/application/repositories';
import { ProgramEntity } from '@/domain/programs/enterprise/entities';

interface GetProgramByIdRequest {
  id: string;
}

interface GetProgramByIdResponse {
  program: ProgramEntity;
}

@Injectable()
export class GetProgramByIdUseCase {
  constructor(private readonly programRepository: ProgramRepository) {}

  async execute(input: GetProgramByIdRequest): Promise<GetProgramByIdResponse> {
    const program = await this.programRepository.findById(input.id);

    if (!program) {
      throw new NotFoundException({
        message: 'Program not found',
        code: 'PROGRAM_NOT_FOUND',
        data: {
          id: input.id,
        },
      });
    }

    return { program };
  }
}
