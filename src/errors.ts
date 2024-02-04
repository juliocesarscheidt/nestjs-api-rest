export class NotFoundException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundException';
  }
}

export class UnprocessableEntityException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UnprocessableEntityException';
  }
}

export class ServerErrorException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ServerErrorException';
  }
}
