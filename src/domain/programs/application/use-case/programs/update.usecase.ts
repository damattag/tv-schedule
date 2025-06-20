import { Injectable, NotFoundException } from '@nestjs/common';
import { FileInput } from '@/core/types/file';
import { ProgramRepository } from '@/domain/programs/application/repositories';
import { ProgramEntity } from '@/domain/programs/enterprise/entities';

interface UpdateProgramRequest {
  id: string;
  name: string;
  description: string;
  initialDate: Date;
  finalDate: Date;
  banner?: FileInput;
}

interface UpdateProgramResponse {
  program: ProgramEntity;
}

@Injectable()
export class UpdateProgramUseCase {
  constructor(private readonly programRepository: ProgramRepository) {}

  async execute(input: UpdateProgramRequest): Promise<UpdateProgramResponse> {
    const { id, name, description, initialDate, finalDate } = input;

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

    await this.programRepository.update(program);

    return { program };
  }
}
