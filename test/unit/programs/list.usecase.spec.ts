import { ProgramRepository } from '@/domain/programs/application/repositories';
import { ListProgramsUseCase } from '@/domain/programs/application/use-case/programs/list.usecase';

let programRepository: ProgramRepository;
let sut: ListProgramsUseCase;

describe('List Programs', () => {
  beforeEach(() => {
    programRepository = {
      list: vi.fn(),
    } as unknown as ProgramRepository;

    sut = new ListProgramsUseCase(programRepository);
  });

  it('should be able to list programs', async () => {
    programRepository.list = vi.fn().mockResolvedValue([]);

    const result = await sut.execute({});

    expect(result.programs).toBeDefined();
    expect(result.programs.length).toBe(0);
  });

  it('should be able to list programs with pagination', async () => {
    programRepository.list = vi.fn().mockResolvedValue([]);

    const spy = vi.spyOn(programRepository, 'list');

    const date = new Date();

    const result = await sut.execute({
      search: 'Test',
      initialDate: date,
      finalDate: date,
      page: 1,
      limit: 10,
    });

    expect(result.programs).toBeDefined();
    expect(result.programs.length).toBe(0);
    expect(spy).toHaveBeenCalledWith({
      search: 'Test',
      initialDate: date,
      finalDate: date,
      page: 1,
      limit: 10,
    });
  });
});
