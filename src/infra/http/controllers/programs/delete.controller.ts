import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { DeleteProgramUseCase } from '@/domain/programs/application/use-case';
import { SwaggerTags } from '@/infra/config/docs';
import {
  DeleteProgramParams,
  deleteProgramParamsValidationPipe,
} from '@/infra/http/dtos/programs';

@Controller('programs')
@ApiTags(SwaggerTags.PROGRAMS)
export class DeleteProgramController {
  constructor(private readonly deleteProgramUseCase: DeleteProgramUseCase) {}

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a program' })
  @ApiParam({
    name: 'id',
    schema: { type: 'string', format: 'uuid' },
    required: true,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async handle(
    @Param(deleteProgramParamsValidationPipe) params: DeleteProgramParams,
  ): Promise<void> {
    return this.deleteProgramUseCase.execute({
      id: params.id,
    });
  }
}
