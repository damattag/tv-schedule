import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateProgramUseCase } from '@/domain/programs/application/use-case';
import { SwaggerTags } from '@/infra/config/docs';
import {
  CreateProgramBody,
  createProgramBodySwaggerSchema,
  createProgramBodyValidationPipe,
} from '@/infra/http/dtos/programs';

@Controller('programs')
@ApiTags(SwaggerTags.PROGRAMS)
export class CreateProgramController {
  constructor(private readonly createProgramUseCase: CreateProgramUseCase) {}

  @Post()
  @ApiOperation({ summary: 'Create a new program' })
  @ApiBody({ schema: createProgramBodySwaggerSchema })
  @HttpCode(HttpStatus.CREATED)
  async handle(
    @Body(createProgramBodyValidationPipe) body: CreateProgramBody,
  ): Promise<void> {
    return this.createProgramUseCase.execute({
      ...body,
      initialDate: body.initial_date,
      finalDate: body.final_date,
    });
  }
}
