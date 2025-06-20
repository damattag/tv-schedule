import { Module } from '@nestjs/common';
import {
  CreateProgramUseCase,
  DeleteProgramUseCase,
  GetProgramByIdUseCase,
  ListProgramsUseCase,
  UpdateProgramUseCase,
} from '@/domain/programs/application/use-case';
import { DatabaseModule } from '@/infra/database/database.module';
import {
  CreateProgramController,
  DeleteProgramController,
  GetProgramByIdController,
  ListProgramsController,
  UpdateProgramController,
} from './controllers/programs';

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateProgramController,
    DeleteProgramController,
    GetProgramByIdController,
    ListProgramsController,
    UpdateProgramController,
  ],
  providers: [
    CreateProgramUseCase,
    DeleteProgramUseCase,
    GetProgramByIdUseCase,
    ListProgramsUseCase,
    UpdateProgramUseCase,
  ],
})
export class HttpModule {}
