import { makeProgramDetails } from 'test/factories/program-details.factory';
import { ProgramRepository } from '@/domain/programs/application/repositories';
import { ListProgramsUseCase } from '@/domain/programs/application/use-case/programs/list.usecase';

let programRepository: ProgramRepository;
let sut: ListProgramsUseCase;

describe('List Programs', () => {
  beforeEach(() => {
    programRepository = {
      listWithDetails: vi.fn(),
    } as unknown as ProgramRepository;

    sut = new ListProgramsUseCase(programRepository);
  });

  it('should be able to list programs', async () => {
    const program1 = makeProgramDetails();
    const program2 = makeProgramDetails();

    programRepository.listWithDetails = vi
      .fn()
      .mockResolvedValue([program1, program2]);
    programRepository.count = vi.fn().mockResolvedValue(2);

    const result = await sut.execute({
      page: 1,
      limit: 10,
    });

    expect(result.programs).toBeDefined();
    expect(result.programs.length).toBe(2);
    expect(result.programs[0].programId.toString()).toBe(
      program1.programId.toString(),
    );
    expect(result.programs[1].programId.toString()).toBe(
      program2.programId.toString(),
    );
  });

  it('should be able to list programs with pagination', async () => {
    const program1 = makeProgramDetails();
    const program2 = makeProgramDetails();

    programRepository.listWithDetails = vi
      .fn()
      .mockResolvedValue([program1, program2]);
    programRepository.count = vi.fn().mockResolvedValue(2);

    const spy = vi.spyOn(programRepository, 'listWithDetails');

    const date = new Date();

    const result = await sut.execute({
      search: 'Test',
      initialDate: date,
      finalDate: date,
      page: 1,
      limit: 10,
    });

    expect(result.programs).toBeDefined();
    expect(result.programs.length).toBe(2);
    expect(result.programs[0].programId.toString()).toBe(
      program1.programId.toString(),
    );
    expect(result.programs[1].programId.toString()).toBe(
      program2.programId.toString(),
    );
    expect(spy).toHaveBeenCalledWith({
      search: 'Test',
      initialDate: date,
      finalDate: date,
      page: 1,
      limit: 10,
    });
  });
});
