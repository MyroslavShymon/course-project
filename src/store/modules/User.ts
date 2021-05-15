import { Action, Getter, Mutation, State } from "vuex-simple";
import IUser from "../interfaces/IUser";

export default class User implements IUser {
  @State()
  private _email: string;
  @State()
  private _password: string;
  @State()
  private _username: string;
  @State()
  private _name: string;
  @State()
  private _surname: string;
  @State()
  private _phoneNumber: string;
  @State()
  private _confirmPassword: string;

  constructor(
    email: string,
    password: string,
    username: string,
    name: string,
    surname: string,
    phoneNumber: string,
    confirmPassword: string
  ) {
    this._email = email;
    this._password = password;
    this._username = username;
    this._name = name;
    this._surname = surname;
    this._phoneNumber = phoneNumber;
    this._confirmPassword = confirmPassword;
  }

  public set email(email: string) {
    this._email = email;
  }
  public set password(password: string) {
    this._password = password;
  }
  public set username(username: string) {
    this._username = username;
  }
  public set name(name: string) {
    this._name = name;
  }
  public set surname(surname: string) {
    this._surname = surname;
  }
  public set phoneNumber(phoneNumber: string) {
    this._phoneNumber = phoneNumber;
  }
  public set confirmPassword(confirmPassword: string) {
    this._confirmPassword = confirmPassword;
  }

  public get password(): string {
    return this._password;
  }
  public get email(): string {
    return this._email;
  }
  public get username(): string {
    return this._username;
  }
  public get name(): string {
    return this._name;
  }
  public get surname(): string {
    return this._surname;
  }
  public get phoneNumber(): string {
    return this._phoneNumber;
  }
  public get confirmPassword(): string {
    return this._confirmPassword;
  }
}
