import { NotFoundException } from '@nestjs/common';
import { makeProgram } from 'test/factories/program.factory';
import { InvalidInputException } from '@/core/exceptions';
import { ProgramRepository } from '@/domain/programs/application/repositories';
import { UpdateProgramUseCase } from './update.usecase';

describe('Update Program', () => {
  let programRepository: ProgramRepository;
  let sut: UpdateProgramUseCase;

  beforeEach(() => {
    programRepository = {
      findById: vi.fn(),
      update: vi.fn(),
    } as unknown as ProgramRepository;

    sut = new UpdateProgramUseCase(programRepository);
  });

  it('should be able to update a program', async () => {
    const program = makeProgram();

    programRepository.findById = vi.fn().mockResolvedValue(program);

    const result = await sut.execute({
      id: program.id.toString(),
      name: 'Test Program',
      description: 'Test Description',
      initialDate: program.initialDate,
      finalDate: program.finalDate,
      bannerId: program.bannerId,
    });

    expect(result.program.name).toBe('Test Program');
    expect(result.program.description).toBe('Test Description');
    expect(result.program.initialDate).toBe(program.initialDate);
    expect(result.program.finalDate).toBe(program.finalDate);
    expect(result.program.bannerId).toBe(program.bannerId);
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
        bannerId: null,
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
        bannerId: null,
      }),
    ).rejects.toBeInstanceOf(InvalidInputException);
  });

  it('should be able to update a program and remove the banner', async () => {
    const program = makeProgram();

    programRepository.findById = vi.fn().mockResolvedValue(program);

    const result = await sut.execute({
      id: program.id.toString(),
      name: 'Test Program',
      description: 'Test Description',
      initialDate: program.initialDate,
      finalDate: program.finalDate,
      bannerId: null,
    });

    expect(result.program.bannerId).toBe(null);
  });
});
