import { Banner as PrismaBanner, Program as PrismaProgram } from '@prisma/client';
import { UniqueEntityId } from '@/core/entities';
import { ProgramDetailsEntity } from '@/domain/programs/enterprise/entities/value-objects/program-details';

type ProgramDetails = PrismaProgram & {
  banner?: PrismaBanner | null;
};

export class ProgramDetailsMapper {
  static toDomain(raw: ProgramDetails): ProgramDetailsEntity {
    const { id, name, description, initialDate, finalDate, banner } = raw;

    const bannerBase64 = banner?.base64 ?? null;

    const exibitionDate = initialDate.toISOString().split('T')[0];

    const initialTime = initialDate.toISOString().split('T')[1].split('.')[0];
    const finalTime = finalDate.toISOString().split('T')[1].split('.')[0];

    const formattedInitialTime = initialTime.split(':').slice(0, 2).join(':');
    const formattedFinalTime = finalTime.split(':').slice(0, 2).join(':');

    return ProgramDetailsEntity.create({
      programId: new UniqueEntityId(id),
      name,
      description,
      exibitionDate,
      initialTime: formattedInitialTime,
      finalTime: formattedFinalTime,
      bannerBase64,
    });
  }
}
