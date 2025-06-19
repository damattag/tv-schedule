interface DefaultExceptionProps {
  message: string;
  code: string;
  status: number;
  data?: unknown;
}

export interface ExceptionInput {
  message: string;
  code: string;
  data?: unknown;
}

export class DefaultException extends Error implements DefaultExceptionProps {
  readonly code: string;
  readonly status: number;
  readonly data?: unknown;

  constructor(props: DefaultExceptionProps) {
    const { message, code, status, data } = props;

    super(message);
    this.name = code;
    this.status = status;
    this.data = data;
  }
}
