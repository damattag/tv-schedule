import { faker } from '@faker-js/faker';
import { ProgramEntity } from '@/domain/programs/enterprise/entities';

export function makeProgram(override: Partial<ProgramEntity> = {}) {
  return ProgramEntity.create({
    name: faker.lorem.words(3),
    description: faker.lorem.words(10),
    initialDate: faker.date.recent(),
    finalDate: faker.date.future(),
    ...override,
  });
}
