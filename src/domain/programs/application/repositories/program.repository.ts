import { PaginationParams } from '@/core/types/pagination-params';
import { ProgramEntity } from '@/domain/programs/enterprise/entities';
import { ProgramDetailsEntity } from '../../enterprise/entities/value-objects/program-details';

export interface ProgramFilters extends PaginationParams {
  search?: string;
  initialDate?: Date;
  finalDate?: Date;
}

export abstract class ProgramRepository {
  abstract create(program: ProgramEntity): Promise<void>;
  abstract findById(id: string): Promise<ProgramEntity | null>;
  abstract list(filters?: ProgramFilters): Promise<ProgramEntity[]>;
  abstract update(program: ProgramEntity): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract count(filters?: ProgramFilters): Promise<number>;
  abstract getDetails(id: string): Promise<ProgramDetailsEntity | null>;
  abstract listWithDetails(
    filters?: ProgramFilters,
  ): Promise<ProgramDetailsEntity[]>;
}
