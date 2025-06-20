import { UniqueEntityId } from '@/core/entities';

export interface ProgramDetailsProps {
  programId: UniqueEntityId;
  name: string;
  description: string;
  exibitionDate: string;
  initialTime: string;
  finalTime: string;
  bannerBase64: string | null;
}

export class ProgramDetailsEntity {
  protected constructor(private readonly props: ProgramDetailsProps) {}

  get programId() {
    return this.props.programId;
  }

  get name() {
    return this.props.name;
  }

  get description() {
    return this.props.description;
  }

  get exibitionDate(): string {
    return this.props.exibitionDate;
  }

  get initialTime(): string {
    return this.props.initialTime;
  }

  get finalTime(): string {
    return this.props.finalTime;
  }

  get bannerBase64() {
    return this.props.bannerBase64;
  }

  static create(props: ProgramDetailsProps) {
    return new ProgramDetailsEntity(props);
  }
}
