import { State } from "vuex-simple";
import User from "../modules/User";
import CountryData from "../modules/CountryData";
import Auth from "../modules/Auth";
import UserToLogin from "../modules/UserToLogin";

export class MyStore {
  public user = new User("", "", "", "", "", "", "");
  public useLogin = new UserToLogin("", "");
  public auth = new Auth();
  public languages = new CountryData();
  public countriesNames = [] as string[];
}
