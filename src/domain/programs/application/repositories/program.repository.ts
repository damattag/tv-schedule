import { PaginationParams } from '@/core/repositories/pagination-params';
import { ProgramEntity } from '@/domain/programs/enterprise/entities';

interface ProgramFilters extends PaginationParams {
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
}
