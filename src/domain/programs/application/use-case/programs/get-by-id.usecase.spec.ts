import { makeProgram } from 'test/factories/program.factory';
import { NotFoundException } from '@/core/exceptions';
import { ProgramRepository } from '@/domain/programs/application/repositories';
import { GetProgramByIdUseCase } from './get-by-id.usecase';

let programRepository: ProgramRepository;
let sut: GetProgramByIdUseCase;

describe('Get Program By Id', () => {
  beforeEach(() => {
    programRepository = {
      findById: vi.fn(),
    } as unknown as ProgramRepository;

    sut = new GetProgramByIdUseCase(programRepository);
  });

  it('should be able to get a program by id', async () => {
    const program = makeProgram();
    programRepository.findById = vi.fn().mockResolvedValue(program);

    const result = await sut.execute({ id: program.id.toString() });

    expect(result.program).toBeDefined();
    expect(result.program.id).toBe(program.id);
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
