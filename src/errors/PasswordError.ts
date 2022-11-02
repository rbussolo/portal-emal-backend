export class PasswordError {
  public readonly message: string;
  public readonly statusCode: number;
  public readonly messages: [string];

  constructor(message: string, messages: [string], statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
    this.messages = messages;
  }
}
