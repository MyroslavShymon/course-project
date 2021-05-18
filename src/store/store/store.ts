import { State } from "vuex-simple";
import User from "../modules/User";
import CountryData from "../modules/CountryData";
import Auth from "../modules/Auth";
import UserToLogin from "../modules/UserToLogin";
import Note from "../modules/Note";
import Task from "../modules/Task";
import Reminder from "../modules/Reminder";

export class MyStore {
  public user = new User("", "", "", "", "", "", "");
  public note = new Note("", "", false, "");
  public task = new Task("", "", false, "", 1, false);
  public reminder = new Reminder("", "", false, "", "", "", false);
  public useLogin = new UserToLogin("", "");
  public auth = new Auth();
  public languages = new CountryData();
  public countriesNames = [] as string[];
}
