import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { ProgramEntity } from '@/domain/programs/enterprise/entities';
import { ProgramsMapper } from '@/infra/database/prisma/mappers';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

export function makeProgram(override: Partial<ProgramEntity> = {}) {
  return ProgramEntity.create({
    name: faker.lorem.words(3),
    description: faker.lorem.words(10),
    initialDate: faker.date.recent(),
    finalDate: faker.date.soon(),
    ...override,
  });
}

@Injectable()
export class ProgramFactory {
  constructor(private readonly prisma: PrismaService) {}

  async makePrisma(data: Partial<ProgramEntity> = {}): Promise<ProgramEntity> {
    const program = makeProgram(data);

    await this.prisma.program.create({
      data: ProgramsMapper.toPrisma(program),
    });

    return program;
  }
}
