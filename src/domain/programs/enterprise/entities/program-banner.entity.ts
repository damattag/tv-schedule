import { Entity, UniqueEntityId } from '@/core/entities';

export interface ProgramBannerProps {
  programId: UniqueEntityId;
  bannerId: UniqueEntityId;
}

export class ProgramBannerEntity extends Entity<ProgramBannerProps> {
  get programId() {
    return this.props.programId;
  }

  get bannerId() {
    return this.props.bannerId;
  }

  static create(props: ProgramBannerProps, id?: UniqueEntityId) {
    return new ProgramBannerEntity(props, id);
  }
}
