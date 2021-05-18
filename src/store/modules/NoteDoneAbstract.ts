import { State } from "vuex-simple";
import Note from "./Note";

export default abstract class NoteDoneAbstract extends Note {
  @State()
  protected _done: boolean;

  constructor(
    title: string,
    description: string,
    pin: boolean,
    group: string,
    done: boolean
  ) {
    super(title, description, pin, group);
    this._done = done;
  }

  public set done(done: boolean) {
    this._done = done;
  }

  public get done(): boolean {
    return this._done;
  }
}
