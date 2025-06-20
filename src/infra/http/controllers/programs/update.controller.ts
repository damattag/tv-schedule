import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { UpdateProgramUseCase } from '@/domain/programs/application/use-case';
import { SwaggerTags } from '@/infra/config/docs';
import {
  UpdateProgramBody,
  UpdateProgramParams,
  updateProgramBodySwaggerSchema,
  updateProgramBodyValidationPipe,
  updateProgramParamsValidationPipe,
} from '@/infra/http/dtos/programs';

@Controller('programs')
@ApiTags(SwaggerTags.PROGRAMS)
export class UpdateProgramController {
  constructor(private readonly updateProgramUseCase: UpdateProgramUseCase) {}

  @Patch('/:id')
  @ApiOperation({ summary: 'Update a program' })
  @ApiParam({
    name: 'id',
    schema: { type: 'string', format: 'uuid' },
    required: true,
  })
  @ApiBody({ schema: updateProgramBodySwaggerSchema })
  async handle(
    @Param(updateProgramParamsValidationPipe) params: UpdateProgramParams,
    @Body(updateProgramBodyValidationPipe) body: UpdateProgramBody,
  ): Promise<void> {
    return this.updateProgramUseCase.execute({
      id: params.id,
      ...body,
      initialDate: body.initial_date,
      finalDate: body.final_date,
    });
  }
}
