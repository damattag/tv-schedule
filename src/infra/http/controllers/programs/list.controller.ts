import { Controller, Get, Query } from '@nestjs/common';
import { ApiBasicAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ListProgramsUseCase } from '@/domain/programs/application/use-case';
import { SwaggerTags } from '@/infra/config/docs';
import {
  ListProgramsQueryParams,
  ListProgramsResponse,
  listProgramsQueryParamsValidationPipe,
} from '@/infra/http/dtos/programs';
import { ProgramDetailsPresenter } from '@/infra/http/presenters';

@Controller('programs')
@ApiBasicAuth()
@ApiTags(SwaggerTags.PROGRAMS)
export class ListProgramsController {
  constructor(private readonly listProgramsUseCase: ListProgramsUseCase) {}

  @Get('/')
  @ApiOperation({ summary: 'List programs' })
  @ApiQuery({ name: 'page', schema: { type: 'number' }, required: false })
  @ApiQuery({ name: 'limit', schema: { type: 'number' }, required: false })
  @ApiQuery({ name: 'search', schema: { type: 'string' }, required: false })
  @ApiQuery({
    name: 'initial_date',
    schema: { type: 'string', format: 'date-time' },
    required: false,
  })
  @ApiQuery({
    name: 'final_date',
    schema: { type: 'string', format: 'date-time' },
    required: false,
  })
  async handle(
    @Query(listProgramsQueryParamsValidationPipe)
    queryRaw: ListProgramsQueryParams,
  ): Promise<ListProgramsResponse> {
    const { programs, meta } = await this.listProgramsUseCase.execute({
      ...queryRaw,
      initialDate: queryRaw.initial_date,
      finalDate: queryRaw.final_date,
    });

    return {
      data: programs.map(ProgramDetailsPresenter.toHttp),
      meta,
    };
  }
}
