import { State } from "vuex-simple";
import IUserToLogin from "../interfaces/IUserToLogin";

export default class UserToLogin implements IUserToLogin {
  @State()
  private _email: string;
  @State()
  private _password: string;

  constructor(email: string, password: string) {
    this._email = email;
    this._password = password;
  }

  public set password(password: string) {
    this._password = password;
  }
  public set email(email: string) {
    this._email = email;
  }

  public get password(): string {
    return this._password;
  }
  public get email(): string {
    return this._email;
  }
}
