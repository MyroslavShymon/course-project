import IUserToLogin from "./IUserToLogin";

export default interface IUser extends IUserToLogin {
  email: string;
  password: string;
  username: string;
  name: string;
  surname: string;
  phoneNumber: string;
  confirmPassword: string;
}
