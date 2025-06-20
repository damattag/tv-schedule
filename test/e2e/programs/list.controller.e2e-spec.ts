import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { BasicTokenFactory } from 'test/factories/basic-toke.factory';
import { ProgramFactory } from 'test/factories/program.factory';
import { AppModule } from '@/infra/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { EnvModule } from '@/infra/env';

describe('List programs (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let programFactory: ProgramFactory;
  let basicTokenFactory: BasicTokenFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule, EnvModule],
      providers: [ProgramFactory, BasicTokenFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);
    programFactory = moduleRef.get(ProgramFactory);
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

  test('[GET] /programs', async () => {
    for (let i = 0; i < 10; i++) {
      await programFactory.makePrisma();
    }

    const basicAuth = basicTokenFactory.makeToken();

    const response = await request(app.getHttpServer())
      .get('/programs')
      .set('Authorization', `Basic ${basicAuth}`)
      .query({
        page: 1,
        limit: 5,
      });

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(5);
    expect(response.body.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
        }),
      ]),
    );
    expect(response.body.meta).toEqual(
      expect.objectContaining({
        total: 10,
        page: 1,
        listed: 5,
      }),
    );
  });
});
