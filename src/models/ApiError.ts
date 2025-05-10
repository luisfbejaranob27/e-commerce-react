export class ApiError extends Error {
  constructor(public message: string, public errors: any) {
    super(message);
    this.name = 'ApiError';
  }
}
