import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { BannerFactory } from 'test/factories/banner.factory';
import { ProgramFactory } from 'test/factories/program.factory';
import { AppModule } from '@/infra/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

describe('Get program by id (E2E)', () => {
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

  test('[GET] /programs/:id', async () => {
    const program = await programFactory.makePrisma();
    await bannerFactory.makePrisma({
      programId: program.id,
    });

    const exhibitionDate = program.initialDate.toISOString().split('T')[0];

    const initialTime = program.initialDate
      .toISOString()
      .split('T')[1]
      .split('.')[0];
    const finalTime = program.finalDate
      .toISOString()
      .split('T')[1]
      .split('.')[0];

    const formattedInitialTime = initialTime.split(':').slice(0, 2).join(':');
    const formattedFinalTime = finalTime.split(':').slice(0, 2).join(':');

    const response = await request(app.getHttpServer()).get(
      `/programs/${program.id.toString()}`,
    );

    expect(response.status).toBe(200);

    expect(response.body.data).toEqual(
      expect.objectContaining({
        id: program.id.toString(),
        name: program.name,
        description: program.description,
        exhibition_date: exhibitionDate,
        start_time: formattedInitialTime,
        end_time: formattedFinalTime,
        banner_base64: expect.any(String),
        banner_type: expect.toBeOneOf(['image/png', 'image/jpeg']),
      }),
    );
  });
});
