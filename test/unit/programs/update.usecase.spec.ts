import { NotFoundException } from '@nestjs/common';
import { makeBanner } from 'test/factories/banner.factory';
import { makeProgram } from 'test/factories/program.factory';
import { InvalidInputException } from '@/core/exceptions';
import {
  BannerRepository,
  ProgramRepository,
} from '@/domain/programs/application/repositories';
import { UpdateProgramUseCase } from '@/domain/programs/application/use-case/programs/update.usecase';

describe('Update Program', () => {
  let programRepository: ProgramRepository;
  let bannerRepository: BannerRepository;
  let sut: UpdateProgramUseCase;

  beforeEach(() => {
    programRepository = {
      findById: vi.fn(),
      update: vi.fn(),
    } as unknown as ProgramRepository;

    bannerRepository = {
      findById: vi.fn(),
      delete: vi.fn(),
      create: vi.fn(),
    } as unknown as BannerRepository;

    sut = new UpdateProgramUseCase(programRepository, bannerRepository);
  });

  it('should be able to update a program without banner', async () => {
    const program = makeProgram({
      bannerId: null,
    });

    programRepository.findById = vi.fn().mockResolvedValue(program);

    const updateProgramSpy = vi.spyOn(programRepository, 'update');
    const deleteBannerSpy = vi.spyOn(bannerRepository, 'delete');
    const createBannerSpy = vi.spyOn(bannerRepository, 'create');

    const result = await sut.execute({
      id: program.id.toString(),
      name: 'Test Program',
      description: 'Test Description',
      initialDate: program.initialDate,
      finalDate: program.finalDate,
    });

    expect(result).toBeUndefined();
    expect(updateProgramSpy).toHaveBeenCalled();
    expect(deleteBannerSpy).not.toHaveBeenCalled();
    expect(createBannerSpy).not.toHaveBeenCalled();
    expect(programRepository.update).toHaveBeenCalledWith(
      expect.objectContaining({
        id: program.id,
        name: 'Test Program',
        description: 'Test Description',
        initialDate: program.initialDate,
        finalDate: program.finalDate,
      }),
    );
  });

  it('should not be able to update a program if the program does not exist', async () => {
    programRepository.findById = vi.fn().mockResolvedValue(null);

    await expect(
      sut.execute({
        id: '1',
        name: 'Test Program',
        description: 'Test Description',
        initialDate: new Date(),
        finalDate: new Date(),
      }),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it('should not be able to update a program if the initial date is greater than the final date', async () => {
    const program = makeProgram();

    programRepository.findById = vi.fn().mockResolvedValue(program);

    await expect(
      sut.execute({
        id: program.id.toString(),
        name: 'Test Program',
        description: 'Test Description',
        initialDate: new Date(Date.now() + 1000),
        finalDate: new Date(),
      }),
    ).rejects.toBeInstanceOf(InvalidInputException);
  });

  it('should be able to update a program and remove the banner', async () => {
    const banner = makeBanner();
    const program = makeProgram({
      bannerId: banner.id,
    });

    programRepository.findById = vi.fn().mockResolvedValue(program);
    bannerRepository.findById = vi.fn().mockResolvedValue(banner);

    const deleteBannerSpy = vi.spyOn(bannerRepository, 'delete');
    const createBannerSpy = vi.spyOn(bannerRepository, 'create');

    const result = await sut.execute({
      id: program.id.toString(),
      name: 'Test Program',
      description: 'Test Description',
      initialDate: program.initialDate,
      finalDate: program.finalDate,
    });

    expect(result).toBeUndefined();
    expect(deleteBannerSpy).toHaveBeenCalled();
    expect(createBannerSpy).not.toHaveBeenCalled();
  });

  it('should be able to update a program and create a new banner', async () => {
    const banner = makeBanner();
    const program = makeProgram({
      bannerId: null,
    });

    programRepository.findById = vi.fn().mockResolvedValue(program);

    const deleteBannerSpy = vi.spyOn(bannerRepository, 'delete');
    const createBannerSpy = vi.spyOn(bannerRepository, 'create');

    const result = await sut.execute({
      id: program.id.toString(),
      name: 'Test Program',
      description: 'Test Description',
      initialDate: program.initialDate,
      finalDate: program.finalDate,
      banner: {
        name: banner.name,
        type: banner.type,
        buffer: Buffer.from(banner.base64),
      },
    });

    expect(result).toBeUndefined();
    expect(deleteBannerSpy).not.toHaveBeenCalled();
    expect(createBannerSpy).toHaveBeenCalled();
    expect(programRepository.update).toHaveBeenCalled();
  });

  it('should be able to update a program and and update the banner', async () => {
    const banner = makeBanner();
    const program = makeProgram({
      bannerId: banner.id,
    });

    const newBanner = makeBanner();

    programRepository.findById = vi.fn().mockResolvedValue(program);
    bannerRepository.findById = vi.fn().mockResolvedValue(banner);

    const deleteBannerSpy = vi.spyOn(bannerRepository, 'delete');
    const createBannerSpy = vi.spyOn(bannerRepository, 'create');

    const result = await sut.execute({
      id: program.id.toString(),
      name: 'Test Program',
      description: 'Test Description',
      initialDate: program.initialDate,
      finalDate: program.finalDate,
      banner: {
        name: newBanner.name,
        type: newBanner.type,
        buffer: Buffer.from(newBanner.base64, 'base64'),
      },
    });

    expect(result).toBeUndefined();
    expect(deleteBannerSpy).toHaveBeenCalled();
    expect(createBannerSpy).toHaveBeenCalled();
    expect(programRepository.update).toHaveBeenCalledWith(
      expect.objectContaining({
        bannerId: expect.not.toBeOneOf([banner.id]),
      }),
    );
    expect(bannerRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        name: newBanner.name,
        type: newBanner.type,
        base64: newBanner.base64,
      }),
    );
  });
});
