import { State } from "vuex-simple";
import User from "../modules/User";
import CountryData from "../modules/CountryData";
import Auth from "../modules/Auth";

export class MyStore {
  public user = new User("", "", "", "", "", "", "");
  public auth = new Auth();
  public languages = new CountryData();
  public countriesNames = [] as string[];
}
