import {
  Body,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  UploadedFile,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
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
  @ApiConsumes('multipart/form-data')
  @ApiParam({
    name: 'id',
    schema: { type: 'string', format: 'uuid' },
    required: true,
  })
  @ApiBody({ schema: updateProgramBodySwaggerSchema })
  async handle(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }), // 5MB
          new FileTypeValidator({ fileType: '.(png|jpg)' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Param(updateProgramParamsValidationPipe)
    params: UpdateProgramParams,
    @Body(updateProgramBodyValidationPipe) body: UpdateProgramBody,
  ): Promise<void> {
    return this.updateProgramUseCase.execute({
      id: params.id,
      ...body,
      initialDate: body.initial_date,
      finalDate: body.final_date,
      banner: {
        buffer: file.buffer,
        type: file.mimetype,
        name: file.originalname,
      },
    });
  }
}
