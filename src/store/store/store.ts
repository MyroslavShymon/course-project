import { Module, State } from "vuex-simple";
import User from "../modules/User";

export class MyStore {
  public user = new User("", "");
  @State()
  public version = "2.0.0";
  @State()
  public menuToggle = false;
  @State()
  public validEmail = false;
  @State()
  public validPassword = false;
}
