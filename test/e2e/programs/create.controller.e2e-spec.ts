import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { BannerFactory } from 'test/factories/banner.factory';
import { BasicTokenFactory } from 'test/factories/basic-toke.factory';
import { makeProgram, ProgramFactory } from 'test/factories/program.factory';
import { AppModule } from '@/infra/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { EnvModule } from '@/infra/env';

describe('Create program (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let basicTokenFactory: BasicTokenFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule, EnvModule],
      providers: [ProgramFactory, BannerFactory, BasicTokenFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);
    basicTokenFactory = moduleRef.get(BasicTokenFactory);

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

  test('[POST] /programs', async () => {
    const program = makeProgram();

    const basicAuth = basicTokenFactory.makeToken();

    const response = await request(app.getHttpServer())
      .post('/programs')
      .field('name', program.name)
      .field('description', program.description)
      .field('initial_date', program.initialDate.toISOString())
      .field('final_date', program.finalDate.toISOString())
      .attach('file', 'test/e2e/config/sample.png')
      .set('Content-Type', 'multipart/form-data')
      .set('Authorization', `Basic ${basicAuth}`);

    expect(response.status).toBe(201);

    const programOnDatabase = await prisma.program.findFirst({
      where: { name: program.name },
    });

    expect(programOnDatabase).toBeDefined();
    expect(programOnDatabase).toEqual(
      expect.objectContaining({
        name: program.name,
        description: program.description,
        initialDate: program.initialDate,
        finalDate: program.finalDate,
      }),
    );

    const bannerOnDatabase = await prisma.banner.findFirst({
      where: { programId: programOnDatabase?.id },
    });

    expect(bannerOnDatabase).toBeDefined();
    expect(bannerOnDatabase?.name).toBe('sample.png');
    expect(bannerOnDatabase?.type).toBe('image/png');
  });
});
