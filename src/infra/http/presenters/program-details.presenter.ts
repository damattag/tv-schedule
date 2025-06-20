import { ProgramDetailsEntity } from '@/domain/programs/enterprise/entities/value-objects/program-details';

export class ProgramDetailsPresenter {
  static toHttp(program: ProgramDetailsEntity) {
    return {
      id: program.programId.toString(),
      name: program.name,
      description: program.description,
      exhibition_date: program.exhibitionDate,
      start_time: program.initialTime,
      end_time: program.finalTime,
      banner_base64: program.bannerBase64,
      banner_type: program.bannerType as 'image/png' | 'image/jpg',
    };
  }
}
