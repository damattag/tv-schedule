import { Optional } from '@prisma/client/runtime/library';
import { Entity, UniqueEntityId } from '@/core/entities';

export interface BannerProps {
  name: string;
  type: string;
  base64: string;
  programId: UniqueEntityId;

  createdAt: Date;
  updatedAt?: Date | null;
}

type CreateBannerInput = Optional<BannerProps, 'createdAt' | 'updatedAt'>;

export class BannerEntity extends Entity<BannerProps> {
  get name() {
    return this.props.name;
  }

  get type() {
    return this.props.type;
  }

  get base64() {
    return this.props.base64;
  }

  get programId() {
    return this.props.programId;
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

  set type(value: string) {
    this.props.type = value;
    this.touch();
  }

  set base64(value: string) {
    this.props.base64 = value;
    this.touch();
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  static create(props: CreateBannerInput, id?: UniqueEntityId) {
    const banner = new BannerEntity(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    return banner;
  }
}
