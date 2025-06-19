import { ProgramRepository } from '@/domain/programs/application/repositories';
import { ProgramEntity } from '@/domain/programs/enterprise/entities';

interface ListProgramsRequest {
  search?: string;
  initialDate?: Date;
  finalDate?: Date;
  page: number;
  limit: number;
}

interface ListProgramsResponse {
  programs: ProgramEntity[];
}

export class ListProgramsUseCase {
  constructor(private readonly programRepository: ProgramRepository) {}

  async execute(input: ListProgramsRequest): Promise<ListProgramsResponse> {
    const programs = await this.programRepository.list(input);

    return { programs };
  }
}
