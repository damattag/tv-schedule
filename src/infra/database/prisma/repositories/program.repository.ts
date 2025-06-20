import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  ProgramFilters,
  ProgramRepository,
} from '@/domain/programs/application/repositories';
import { ProgramEntity } from '@/domain/programs/enterprise/entities';
import { ProgramDetailsEntity } from '@/domain/programs/enterprise/entities/value-objects/program-details';
import { ProgramDetailsMapper, ProgramsMapper } from '@/infra/database/prisma/mappers';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

@Injectable()
export class PrismaProgramRepository implements ProgramRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(program: ProgramEntity): Promise<void> {
    const data = ProgramsMapper.toPrisma(program);

    await this.prisma.program.create({ data });
  }

  async findById(id: string): Promise<ProgramEntity | null> {
    const program = await this.prisma.program.findUnique({
      where: { id },
    });

    if (!program) {
      return null;
    }

    return ProgramsMapper.toDomain(program);
  }

  async list(input: ProgramFilters): Promise<ProgramEntity[]> {
    const { page, limit } = input;

    const skip = this.buildSkip(page, limit);

    const where = this.buildWhere(input);
    const programs = await this.prisma.program.findMany({
      where,
      orderBy: { initialDate: 'desc' },
      skip,
      take: limit,
    });

    return programs.map(ProgramsMapper.toDomain);
  }

  async update(program: ProgramEntity): Promise<void> {
    const data = ProgramsMapper.toPrisma(program);

    await this.prisma.program.update({ where: { id: program.id.toString() }, data });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.program.delete({ where: { id } });
  }

  async getDetails(id: string): Promise<ProgramDetailsEntity | null> {
    const program = await this.prisma.program.findUnique({
      where: { id },
      include: {
        banner: true,
      },
    });

    if (!program) {
      return null;
    }

    return ProgramDetailsMapper.toDomain(program);
  }

  async listWithDetails(input: ProgramFilters): Promise<ProgramDetailsEntity[]> {
    const programs = await this.prisma.program.findMany({
      where: this.buildWhere(input),
      include: { banner: true },
    });

    return programs.map(ProgramDetailsMapper.toDomain);
  }

  private buildWhere(input: ProgramFilters): Prisma.ProgramWhereInput {
    const { search, initialDate, finalDate } = input;

    return {
      ...(search && {
        OR: [{ name: { contains: search } }, { description: { contains: search } }],
      }),
      ...(initialDate && !finalDate && { initialDate: { gte: initialDate } }),
      ...(finalDate && !initialDate && { finalDate: { lte: finalDate } }),
      ...(initialDate &&
        finalDate && {
          OR: [
            {
              AND: [
                { initialDate: { gte: initialDate } },
                { initialDate: { lte: finalDate } },
              ],
            },
            {
              AND: [
                { finalDate: { gte: initialDate } },
                { finalDate: { lte: finalDate } },
              ],
            },
            {
              AND: [
                { initialDate: { lte: initialDate } },
                { finalDate: { gte: finalDate } },
              ],
            },
          ],
        }),
    };
  }

  private buildSkip(page?: number, limit?: number): Prisma.ProgramFindManyArgs['skip'] {
    if (!page || !limit) {
      return undefined;
    }

    return (page - 1) * limit;
  }
}
