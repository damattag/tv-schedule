import { Injectable } from '@nestjs/common';
import { ProgramRepository } from '@/domain/programs/application/repositories';
import { ProgramDetailsEntity } from '@/domain/programs/enterprise/entities/value-objects/program-details';

interface ListProgramsRequest {
  search?: string;
  initialDate?: Date;
  finalDate?: Date;
  page?: number;
  limit?: number;
}

interface ListProgramsResponse {
  programs: ProgramDetailsEntity[];
}

@Injectable()
export class ListProgramsUseCase {
  constructor(private readonly programRepository: ProgramRepository) {}

  async execute(input: ListProgramsRequest): Promise<ListProgramsResponse> {
    const programs = await this.programRepository.listWithDetails(input);

    return { programs };
  }
}
