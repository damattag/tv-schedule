import { Injectable } from '@nestjs/common';
import { ProgramRepository } from '@/domain/programs/application/repositories';
import { ProgramDetailsEntity } from '@/domain/programs/enterprise/entities/value-objects/program-details';

interface ListProgramsRequest {
  search?: string;
  initialDate?: Date;
  finalDate?: Date;
  page: number;
  limit: number;
}

interface ListProgramsResponse {
  programs: ProgramDetailsEntity[];
  meta: {
    page: number;
    listed: number;
    total: number;
  };
}

@Injectable()
export class ListProgramsUseCase {
  constructor(private readonly programRepository: ProgramRepository) {}

  async execute(input: ListProgramsRequest): Promise<ListProgramsResponse> {
    const [programs, total] = await Promise.all([
      this.programRepository.listWithDetails(input),
      this.programRepository.count(input),
    ]);

    return {
      programs,
      meta: { page: input.page, listed: programs.length, total },
    };
  }
}
