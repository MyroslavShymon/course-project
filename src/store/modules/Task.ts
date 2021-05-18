import { State } from "vuex-simple";
import INote from "../interfaces/INote";
import Note from "./Note";

export default class Task extends Note {
  @State()
  private _priority: number;
  private _done: boolean;

  constructor(
    title: string,
    description: string,
    pin: boolean,
    group: string,
    priority: number,
    done: boolean
  ) {
    super(title, description, pin, group);
    this._priority = priority;
    this._done = done;
  }

  public set priority(priority: number) {
    this._priority = priority;
  }
  public set done(done: boolean) {
    this._done = done;
  }

  public get priority(): number {
    return this._priority;
  }
  public get done(): boolean {
    return this._done;
  }

  public sortByPriority(): INote[] {
    let tasks = JSON.parse(localStorage.task);
    return tasks.sort((x: any, y: any) => y._priority - x._priority);
  }
}
