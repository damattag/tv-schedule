import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@/core/exceptions';
import { ProgramRepository } from '@/domain/programs/application/repositories';
import { ProgramDetailsEntity } from '@/domain/programs/enterprise/entities/value-objects/program-details';

interface GetProgramByIdRequest {
  id: string;
}

interface GetProgramByIdResponse {
  program: ProgramDetailsEntity;
}

@Injectable()
export class GetProgramByIdUseCase {
  constructor(private readonly programRepository: ProgramRepository) {}

  async execute(input: GetProgramByIdRequest): Promise<GetProgramByIdResponse> {
    const program = await this.programRepository.getDetails(input.id);

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
