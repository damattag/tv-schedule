import { makeProgram } from 'test/factories/program.factory';
import { NotFoundException } from '@/core/exceptions';
import { ProgramRepository } from '@/domain/programs/application/repositories';
import { DeleteProgramUseCase } from './delete.usecase';

describe('Delete Program', () => {
  let sut: DeleteProgramUseCase;
  let programRepository: ProgramRepository;

  beforeEach(() => {
    programRepository = {
      findById: vi.fn(),
      delete: vi.fn(),
    } as unknown as ProgramRepository;

    sut = new DeleteProgramUseCase(programRepository);
  });

  it('should be able to delete a program', async () => {
    const program = makeProgram();

    programRepository.findById = vi.fn().mockResolvedValue(program);

    const spy = vi.spyOn(programRepository, 'delete');

    await sut.execute({
      id: program.id.toString(),
    });

    expect(spy).toHaveBeenCalledWith(program.id.toString());
  });

  it('should not be able to delete a program if it does not exist', async () => {
    programRepository.findById = vi.fn().mockResolvedValue(null);

    await expect(async () => await sut.execute({ id: '1' })).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });
});
