import { makeProgram } from 'test/factories/program.factory';
import { ConflictException, InvalidInputException } from '@/core/exceptions';
import { ProgramRepository } from '@/domain/programs/application/repositories';
import { CreateProgramUseCase } from './create.usecase';

let programRepository: ProgramRepository;
let sut: CreateProgramUseCase;

const ONE_MINUTE_IN_MS = 60 * 1000;

describe('Create Program', () => {
  beforeEach(() => {
    programRepository = {
      create: vi.fn(),
      list: vi.fn(),
    } as unknown as ProgramRepository;

    sut = new CreateProgramUseCase(programRepository);
  });

  it('should be able to create a program', async () => {
    programRepository.list = vi.fn().mockResolvedValue([]);

    const result = await sut.execute({
      name: 'Test Program',
      description: 'Test Description',
      initialDate: new Date(),
      finalDate: new Date(Date.now() + ONE_MINUTE_IN_MS),
    });

    expect(result.program).toBeDefined();
    expect(result.program.name).toBe('Test Program');
    expect(result.program.description).toBe('Test Description');
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
