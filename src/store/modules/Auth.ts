import { Action, Getter, Mutation, State } from "vuex-simple";
import axios from "axios";
import User from "./User";
import IUserToLogin from "../interfaces/IUserToLogin";
import router from "@/router";

export default class Auth {
  @State()
  private status!: string;
  @State()
  private user!: User;
  @State()
  private token!: string;
  @State()
  private _error!: string;

  @Action()
  async register(user: User) {
    this.register_request();
    try {
      console.log("try", user);

      let res = await axios.post(
        "http://localhost:5001/api/auth/register",
        user
      );
      console.log(res);
      if (res.data.success) {
        this.register_success();
      }
      return res;
    } catch (err) {
      this.auth_error(err);
    }
  }

  @Action()
  async login(user: IUserToLogin) {
    this.auth_request();
    try {
      let res = await axios.post("http://localhost:5001/api/auth/login", user);
      if (res.data.success) {
        const token = res.data.token;
        const user = res.data.user;
        // Store the token into the localstorage
        localStorage.setItem("token", token);
        // Set the axios defaults
        axios.defaults.headers.common["Authorization"] = token;
        this.auth_success(token, user);
      }
      return res;
    } catch (err) {
      this.auth_error(err);
    }
  }

  @Action()
  async logout() {
    try {
      await localStorage.removeItem("token");
      this.get_logout();
      delete axios.defaults.headers.common["Authorization"];
      localStorage.isAuthOrganizer = "false";
      router.push("/login");
      return;
    } catch (error) {
      console.log(error);
    }
  }

  @Action()
  async getProfile() {
    this.get_profile_request();
    try {
      axios.defaults.headers.common["Authorization"] = localStorage.token;
      let res = await axios.get("http://localhost:5001/api/auth/");
      this.get_profile(res.data);
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  @Mutation()
  get_logout() {
    this.token = "";
    this.user = new User("", "", "", "", "", "", "");
    this.status = "";
  }
  @Mutation()
  get_profile_request() {
    this.status = "loading";
  }
  @Mutation()
  get_profile(data: { user: User }) {
    this.status = "success";
    this.user = data.user;
  }
  @Mutation()
  register_request() {
    this.status = "loading";
  }
  @Mutation()
  register_success() {
    this.status = "succes";
  }
  @Mutation()
  auth_request() {
    status = "loading";
  }
  @Mutation()
  auth_success(token: string, user: User) {
    this.token = token;
    this.user = user;
    this.status = "succes";
  }
  @Mutation()
  auth_error(error: { response: { data: { msg: string } } }) {
    this._error = error.response.data.msg;
  }
  get error() {
    return this._error;
  }
  get currentUser(): User {
    return this.user;
  }
}
