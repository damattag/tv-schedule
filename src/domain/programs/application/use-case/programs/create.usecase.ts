import { Injectable } from '@nestjs/common';
import { ConflictException } from '@/core/exceptions';
import { FileInput } from '@/core/types/file';
import { ProgramRepository } from '@/domain/programs/application/repositories';
import { ProgramEntity } from '@/domain/programs/enterprise/entities';

interface CreateProgramRequest {
  name: string;
  description: string;
  initialDate: Date;
  finalDate: Date;
  banner?: FileInput;
}

interface CreateProgramResponse {
  program: ProgramEntity;
}

@Injectable()
export class CreateProgramUseCase {
  constructor(private readonly programRepository: ProgramRepository) {}

  async execute(input: CreateProgramRequest): Promise<CreateProgramResponse> {
    const { initialDate, finalDate } = input;

    const program = ProgramEntity.create(input);

    const alreadyExists = await this.programRepository.list({ initialDate, finalDate });

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

    return { program };
  }
}
