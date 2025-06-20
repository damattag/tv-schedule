import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { BannerFactory } from 'test/factories/banner.factory';
import { BasicTokenFactory } from 'test/factories/basic-toke.factory';
import { ProgramFactory } from 'test/factories/program.factory';
import { AppModule } from '@/infra/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { EnvModule } from '@/infra/env';

describe('Update program (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let programFactory: ProgramFactory;
  let bannerFactory: BannerFactory;
  let basicTokenFactory: BasicTokenFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule, EnvModule],
      providers: [ProgramFactory, BannerFactory, BasicTokenFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);
    programFactory = moduleRef.get(ProgramFactory);
    bannerFactory = moduleRef.get(BannerFactory);
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

  test('[PUT] /programs/:id', async () => {
    const program = await programFactory.makePrisma();
    await bannerFactory.makePrisma({
      programId: program.id,
    });

    const basicAuth = basicTokenFactory.makeToken();

    const response = await request(app.getHttpServer())
      .put(`/programs/${program.id.toString()}`)
      .set('Authorization', `Basic ${basicAuth}`)
      .send({
        name: 'new name',
        description: program.description,
        initial_date: program.initialDate.toISOString(),
        final_date: program.finalDate.toISOString(),
      });

    expect(response.status).toBe(200);

    const programOnDatabase = await prisma.program.findFirst({
      where: { name: 'new name' },
    });

    expect(programOnDatabase).toBeDefined();
    expect(programOnDatabase).toEqual(
      expect.objectContaining({
        name: 'new name',
        description: program.description,
        initialDate: program.initialDate,
        finalDate: program.finalDate,
      }),
    );

    const bannerOnDatabase = await prisma.banner.findFirst();

    expect(bannerOnDatabase).toBeNull();
  });
});
