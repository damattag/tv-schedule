import {
  Body,
  Controller,
  FileTypeValidator,
  HttpCode,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateProgramUseCase } from '@/domain/programs/application/use-case';
import { SwaggerTags } from '@/infra/config/docs';
import {
  CreateProgramBody,
  createProgramBodySwaggerSchema,
  createProgramBodyValidationPipe,
} from '@/infra/http/dtos/programs';

@Controller('programs')
@UseInterceptors(FileInterceptor('file'))
@ApiTags(SwaggerTags.PROGRAMS)
export class CreateProgramController {
  constructor(private readonly createProgramUseCase: CreateProgramUseCase) {}

  @Post()
  @ApiOperation({ summary: 'Create a new program' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ schema: createProgramBodySwaggerSchema })
  @HttpCode(HttpStatus.CREATED)
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
    @Body(createProgramBodyValidationPipe) body: CreateProgramBody,
  ): Promise<void> {
    return this.createProgramUseCase.execute({
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
