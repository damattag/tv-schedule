import { Entity, UniqueEntityId } from '@/core/entities';
import { InvalidInputException } from '@/core/exceptions/invalid-input.exception';
import { Optional } from '@/core/types/optional';

export interface ProgramProps {
  name: string;
  description: string;
  initialDate: Date;
  finalDate: Date;
  banner?: string | null;
  createdAt: Date;
  updatedAt?: Date | null;
}

type CreateProgramInput = Optional<ProgramProps, 'createdAt'>;

export class ProgramEntity extends Entity<ProgramProps> {
  get name() {
    return this.props.name;
  }

  get description() {
    return this.props.description;
  }

  get initialDate() {
    return this.props.initialDate;
  }

  get finalDate() {
    return this.props.finalDate;
  }

  get banner(): string | null {
    return this.props.banner ?? null;
  }

  set name(value: string) {
    this.props.name = value;
    this.touch();
  }

  set description(value: string) {
    this.props.description = value;
    this.touch();
  }

  set initialDate(value: Date) {
    this.props.initialDate = value;
    this.touch();
  }

  set banner(value: string) {
    this.props.banner = value;
    this.touch();
  }

  set finalDate(value: Date) {
    this.props.finalDate = value;
    this.touch();
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  static create(props: CreateProgramInput, id?: UniqueEntityId) {
    if (props.initialDate >= props.finalDate) {
      throw new InvalidInputException({
        message: 'Initial date must be before final date',
        code: 'INVALID_DATE_RANGE',
        data: {
          initialDate: props.initialDate,
          finalDate: props.finalDate,
        },
      });
    }

    const program = new ProgramEntity(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    return program;
  }
}
