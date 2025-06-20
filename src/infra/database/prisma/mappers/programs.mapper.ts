import { Prisma, Program } from '@prisma/client';
import { UniqueEntityId } from '@/core/entities';
import { ProgramEntity } from '@/domain/programs/enterprise/entities';

export class ProgramsMapper {
  static toDomain(raw: Program): ProgramEntity {
    return ProgramEntity.create(
      {
        name: raw.name,
        description: raw.description,
        initialDate: raw.initialDate,
        finalDate: raw.finalDate,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toPrisma(program: ProgramEntity): Prisma.ProgramUncheckedCreateInput {
    return {
      id: program.id.toString(),
      name: program.name,
      description: program.description,
      initialDate: program.initialDate,
      finalDate: program.finalDate,
      createdAt: program.createdAt,
      updatedAt: program.updatedAt ?? undefined,
    };
  }
}
