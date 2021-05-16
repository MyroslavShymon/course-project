import { Action, Getter, Mutation, State } from "vuex-simple";
import axios from "axios";

export default class Auth {
  @State()
  private status: string = "";
  @State()
  private user: any;
  @State()
  private token: any;

  @Action()
  async register(user: any) {
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
      console.log(err);
    }
  }
  @Action()
  async login(user: any) {
    this.auth_request();
    try {
      let res = await axios.post("http://localhost:5001/api/auth/login", user);
      console.log(res);
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
      console.log(err);
    }
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
  auth_success(token: any, user: any) {
    this.token = token;
    this.user = user;
    this.status = "succes";
    console.log("USER_auth_success", user, user);
  }
}
