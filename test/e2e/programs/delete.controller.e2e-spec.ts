import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { BannerFactory } from 'test/factories/banner.factory';
import { ProgramFactory } from 'test/factories/program.factory';
import { AppModule } from '@/infra/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

describe('Delete program (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let programFactory: ProgramFactory;
  let bannerFactory: BannerFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [ProgramFactory, BannerFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);
    programFactory = moduleRef.get(ProgramFactory);
    bannerFactory = moduleRef.get(BannerFactory);

    await app.init();
  });

  beforeEach(async () => {
    await prisma.program.deleteMany();
    await prisma.banner.deleteMany();
  });

  afterAll(async () => {
    await prisma.program.deleteMany();
    await prisma.banner.deleteMany();
  });

  test('[DELETE] /programs/:id', async () => {
    const program = await programFactory.makePrisma();
    await bannerFactory.makePrisma({
      programId: program.id,
    });

    const response = await request(app.getHttpServer()).delete(
      `/programs/${program.id.toString()}`,
    );

    expect(response.status).toBe(204);

    const programOnDatabase = await prisma.program.findFirst();

    expect(programOnDatabase).toBeNull();

    const bannerOnDatabase = await prisma.banner.findFirst();

    expect(bannerOnDatabase).toBeNull();
  });
});
