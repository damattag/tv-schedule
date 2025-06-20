import { Entity, UniqueEntityId } from '@/core/entities';
import { InvalidInputException } from '@/core/exceptions/invalid-input.exception';
import { Optional } from '@/core/types/optional';

export interface ProgramProps {
  name: string;
  description: string;
  initialDate: Date;
  finalDate: Date;
  bannerId?: UniqueEntityId | null;
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

  get bannerId(): UniqueEntityId | null {
    return this.props.bannerId ?? null;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
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
    if (value >= this.props.finalDate) {
      throw new InvalidInputException({
        message: 'Initial date must be before final date',
        code: 'INVALID_DATE_RANGE',
        data: {
          initialDate: value,
          finalDate: this.props.finalDate,
        },
      });
    }

    this.props.initialDate = value;
    this.touch();
  }

  set bannerId(value: UniqueEntityId | null) {
    this.props.bannerId = value;
    this.touch();
  }

  set finalDate(value: Date) {
    if (value <= this.props.initialDate) {
      throw new InvalidInputException({
        message: 'Final date must be after initial date',
        code: 'INVALID_DATE_RANGE',
        data: {
          initialDate: this.props.initialDate,
          finalDate: value,
        },
      });
    }

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
