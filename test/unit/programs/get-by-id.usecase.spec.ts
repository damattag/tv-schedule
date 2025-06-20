import { makeProgramDetails } from 'test/factories/program-details.factory';
import { NotFoundException } from '@/core/exceptions';
import { ProgramRepository } from '@/domain/programs/application/repositories';
import { GetProgramByIdUseCase } from '@/domain/programs/application/use-case/programs/get-by-id.usecase';

let programRepository: ProgramRepository;
let sut: GetProgramByIdUseCase;

describe('Get Program By Id', () => {
  beforeEach(() => {
    programRepository = {
      getDetails: vi.fn(),
    } as unknown as ProgramRepository;

    sut = new GetProgramByIdUseCase(programRepository);
  });

  it('should be able to get a program by id', async () => {
    const program = makeProgramDetails();
    programRepository.getDetails = vi.fn().mockResolvedValue(program);

    const result = await sut.execute({ id: program.programId.toString() });

    expect(result).toBeDefined();
    expect(result.program.programId.toString()).toBe(
      program.programId.toString(),
    );
    expect(result.program.name).toBe(program.name);
    expect(result.program.description).toBe(program.description);
    expect(result.program.exhibitionDate).toBe(program.exhibitionDate);
  });

  it('should not be able to get a program by id if the program does not exist', async () => {
    await expect(
      async () =>
        await sut.execute({
          id: '1',
        }),
    ).rejects.toBeInstanceOf(NotFoundException);
  });
});
