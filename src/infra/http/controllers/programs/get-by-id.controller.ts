import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { GetProgramByIdUseCase } from '@/domain/programs/application/use-case';
import { SwaggerTags } from '@/infra/config/docs';
import {
  GetProgramByIdParams,
  GetProgramByIdResponse,
  getProgramByIdParamsValidationPipe,
} from '@/infra/http/dtos/programs';
import { ProgramDetailsPresenter } from '@/infra/http/presenters';

@Controller('programs')
@ApiTags(SwaggerTags.PROGRAMS)
export class GetProgramByIdController {
  constructor(private readonly getProgramByIdUseCase: GetProgramByIdUseCase) {}

  @Get('/:id')
  @ApiOperation({ summary: 'Get a program by id' })
  @ApiParam({
    name: 'id',
    schema: { type: 'string', format: 'uuid' },
    required: true,
  })
  async handle(
    @Param(getProgramByIdParamsValidationPipe) params: GetProgramByIdParams,
  ): Promise<GetProgramByIdResponse> {
    const { program: data } = await this.getProgramByIdUseCase.execute({
      id: params.id,
    });

    return { data: ProgramDetailsPresenter.toHttp(data) };
  }
}
