
export class ApiException extends Error {
  public constructor(
    public readonly message = "The request failed due to an internal error",
    public readonly statusCode = 500,
    public readonly code = "Internal Server Error",
  ) {
    super(message);
  }
}

export class NotFoundException extends ApiException {
  public constructor(
    public readonly message = "The  resource associated with the request could not be found",
  ) {
    super(message, 404, "NotFound");
  }
}

export class DuplicateException extends ApiException {
  public constructor(
    public readonly message = "The requested operation failed because it tried to create a resource that already exists",
  ) {
    super(message, 409, "Duplicate");
  }
}
