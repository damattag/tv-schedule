import { faker } from '@faker-js/faker';
import { UniqueEntityId } from '@/core/entities';
import { ProgramDetailsEntity } from '@/domain/programs/enterprise/entities/value-objects';

export function makeProgramDetails(
  override: Partial<ProgramDetailsEntity> = {},
): ProgramDetailsEntity {
  const initialDate = faker.date.recent();
  const finalDate = faker.date.future();

  const exhibitionDate = initialDate.toISOString().split('T')[0];
  const initialTime = initialDate.toISOString().split('T')[1].split('.')[0];
  const finalTime = finalDate.toISOString().split('T')[1].split('.')[0];

  const formattedInitialTime = initialTime.split(':').slice(0, 2).join(':');
  const formattedFinalTime = finalTime.split(':').slice(0, 2).join(':');

  return ProgramDetailsEntity.create({
    programId: new UniqueEntityId(faker.string.uuid()),
    name: faker.lorem.words(3),
    description: faker.lorem.words(10),
    exhibitionDate,
    initialTime: formattedInitialTime,
    finalTime: formattedFinalTime,
    bannerBase64: Buffer.from(faker.image.url()).toString('base64'),
    ...override,
  });
}
