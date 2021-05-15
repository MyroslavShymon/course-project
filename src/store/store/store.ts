import { State } from "vuex-simple";
import User from "../modules/User";
import CountryData from "../modules/CountryData";

export class MyStore {
  public user = new User("", "", "", "", "", "", "");
  public languages = new CountryData();
  public countriesNames = [] as string[];
}
