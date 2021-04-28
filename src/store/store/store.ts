import { Module, State } from "vuex-simple";
import User from "../modules/User";
import ILang from "@/store/interfaces/ILang";

export class MyStore {
  public user = new User("", "");
  @State()
  public version = "2.0.0";
  @State()
  public menuOpened = true;
  @State()
  public validEmail = false;
  @State()
  public validPassword = false;
  @State()
  public isAuth = false;
  @State()
  public languages: ILang[] = [
    { language: "English", active: true },
    { language: "Ukrainian", active: false },
    { language: "Russian", active: false },
    { language: "Polish", active: false },
    { language: "Spanish", active: false },
    { language: "Franch", active: false },
    { language: "German", active: false },
    { language: "Chinese", active: false },
    { language: "Portuguese", active: false },
    { language: "Indian", active: false },
    { language: "Punjabi", active: false },
  ];
}
