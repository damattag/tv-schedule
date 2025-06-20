import { makeBanner } from 'test/factories/banner.factory';
import { makeProgram } from 'test/factories/program.factory';
import { ConflictException, InvalidInputException } from '@/core/exceptions';
import {
  BannerRepository,
  ProgramRepository,
} from '@/domain/programs/application/repositories';
import { CreateProgramUseCase } from '@/domain/programs/application/use-case/programs/create.usecase';
import { UniqueEntityId } from '@/core/entities';

let programRepository: ProgramRepository;
let bannerRepository: BannerRepository;
let sut: CreateProgramUseCase;

const ONE_MINUTE_IN_MS = 60 * 1000;

describe('Create Program', () => {
  beforeEach(() => {
    programRepository = {
      create: vi.fn(),
      list: vi.fn(),
    } as unknown as ProgramRepository;

    bannerRepository = {
      create: vi.fn(),
    } as unknown as BannerRepository;

    sut = new CreateProgramUseCase(programRepository, bannerRepository);
  });

  it('should be able to create a program without banner', async () => {
    const program = makeProgram();

    programRepository.list = vi.fn().mockResolvedValue([]);

    const createProgramSpy = vi.spyOn(programRepository, 'create');
    const createBannerSpy = vi.spyOn(bannerRepository, 'create');

    const result = await sut.execute({
      name: program.name,
      description: program.description,
      initialDate: program.initialDate,
      finalDate: program.finalDate,
    });

    expect(result).toBeUndefined();
    expect(createProgramSpy).toHaveBeenCalled();
    expect(createBannerSpy).not.toHaveBeenCalled();
    expect(programRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        name: program.name,
        description: program.description,
        initialDate: program.initialDate,
        finalDate: program.finalDate,
      }),
    );
  });

  it('should be able to create a program with banner', async () => {
    const program = makeProgram();
    const banner = makeBanner();

    programRepository.list = vi.fn().mockResolvedValue([]);

    const createProgramSpy = vi.spyOn(programRepository, 'create');
    const createBannerSpy = vi.spyOn(bannerRepository, 'create');

    const result = await sut.execute({
      name: program.name,
      description: program.description,
      initialDate: program.initialDate,
      finalDate: program.finalDate,
      banner: {
        buffer: Buffer.from(banner.base64, 'base64'),
        type: banner.type,
        name: banner.name,
      },
    });

    expect(result).toBeUndefined();
    expect(createProgramSpy).toHaveBeenCalled();
    expect(createBannerSpy).toHaveBeenCalled();
    expect(programRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        name: program.name,
        description: program.description,
        initialDate: program.initialDate,
        finalDate: program.finalDate,
      }),
    );
    expect(bannerRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        name: banner.name,
        type: banner.type,
        base64: banner.base64,
        programId: expect.any(UniqueEntityId),
      }),
    );
  });

  it('should not be able to create a program with initial date greater than final date', async () => {
    await expect(
      async () =>
        await sut.execute({
          name: 'Test Program',
          description: 'Test Description',
          initialDate: new Date(Date.now()),
          finalDate: new Date(Date.now() - ONE_MINUTE_IN_MS),
        }),
    ).rejects.toBeInstanceOf(InvalidInputException);
  });

  it('should not be able to create a program with initial date equal to final date', async () => {
    const date = new Date();

    await expect(
      async () =>
        await sut.execute({
          name: 'Test Program',
          description: 'Test Description',
          initialDate: date,
          finalDate: date,
        }),
    ).rejects.toBeInstanceOf(InvalidInputException);
  });

  it('should not be able to create a program when a program with the same date already exists', async () => {
    const program = makeProgram();

    programRepository.list = vi.fn().mockResolvedValue([program]);

    await expect(
      async () =>
        await sut.execute({
          name: 'Test Program',
          description: 'Test Description',
          initialDate: program.initialDate,
          finalDate: program.finalDate,
        }),
    ).rejects.toBeInstanceOf(ConflictException);
  });
});
