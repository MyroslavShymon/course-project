import { State } from "vuex-simple";
import INote from "../interfaces/INote";
import NoteDoneAbstract from "./NoteDoneAbstract";

export default class Task extends NoteDoneAbstract {
  @State()
  private _priority: number;

  constructor(
    title: string,
    description: string,
    pin: boolean,
    group: string,
    priority: number,
    done: boolean
  ) {
    super(title, description, pin, group, done);
    this._priority = priority;
  }

  public set priority(priority: number) {
    this._priority = priority;
  }

  public get priority(): number {
    return this._priority;
  }

  public sortByPriority(): INote[] {
    let tasks = JSON.parse(localStorage.task);
    return tasks.sort((x: any, y: any) => y._priority - x._priority);
  }
}
