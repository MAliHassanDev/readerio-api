import * as argon2 from "argon2";

export class PasswordService {
  public async hash(password: string): Promise<string> {
    return argon2.hash(password);
  }

  public async verify(password: string, hash: string): Promise<boolean> {
    return argon2.verify(hash, password);
  }
}
