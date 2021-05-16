import { Action, Getter, Mutation, State } from "vuex-simple";
import axios from "axios";

export default class Auth {
  @State()
  private status: string = "";

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
  @Mutation()
  register_request() {
    this.status = "loading";
  }
  @Mutation()
  register_success() {
    this.status = "succes";
  }
}
