import { Module, State } from "vuex-simple";
import User from "../modules/User";
import ILang from "@/store/interfaces/ILang";
import IRouter from "@/store/interfaces/IRouter";

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
  public phone = 0;
  @State()
  public validPhone = false;
  @State()
  public languages: ILang[] = [
    { language: "English", active: true, abbreviation: "EN" },
    { language: "Ukrainian", active: false, abbreviation: "UK" },
    { language: "Russian", active: false, abbreviation: "RU" },
    { language: "Polish", active: false, abbreviation: "POL" },
    { language: "Spanish", active: false, abbreviation: "SP" },
    { language: "Franch", active: false, abbreviation: "FR" },
    { language: "German", active: false, abbreviation: "GR" },
    { language: "Chinese", active: false, abbreviation: "CHN" },
    { language: "Portuguese", active: false, abbreviation: "PRT" },
    { language: "Indian", active: false, abbreviation: "IND" },
    { language: "Punjabi", active: false, abbreviation: "PUN" },
  ];
  @State()
  public routers: IRouter[] = [
    { text: "Замітки", link: "/", icon: "task", disabled: null },
    {
      text: "Нагадування",
      link: "/reminder",
      icon: "timelapse",
      disabled: null,
    },
    {
      text: "Документи",
      link: "/documents",
      icon: "text_snippet",
      disabled: "",
    },
    {
      text: "Плани",
      link: "/plans",
      icon: "format_list_numbered",
      disabled: "",
    },
    { text: "Чати", link: "/chats", icon: "groups", disabled: "" },
    {
      text: "Менеджер витрат",
      link: "/manager",
      icon: "paid",
      disabled: "",
    },
    {
      text: "Календар",
      link: "/calendar",
      icon: "event",
      disabled: "",
    },
    { text: "Архів", link: "/archive", icon: "archive", disabled: "" },
    { text: "Корзина", link: "/been", icon: "delete", disabled: "" },
    { text: "Login", link: "/login", icon: "login", disabled: null },
  ];
}
