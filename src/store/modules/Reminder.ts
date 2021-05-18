import { State } from "vuex-simple";
import INote from "../interfaces/INote";
import NoteDoneAbstract from "./NoteDoneAbstract";

export default class Remonder extends NoteDoneAbstract {
  @State()
  private _date: string;
  @State()
  private _time: string;

  constructor(
    title: string,
    description: string,
    pin: boolean,
    group: string,
    date: string,
    time: string,
    done: boolean
  ) {
    super(title, description, pin, group, done);
    this._date = date;
    this._time = time;
  }

  public set date(date: string) {
    this._date = date;
  }
  public set time(time: string) {
    this._time = time;
  }

  public get date(): string {
    return this._date;
  }
  public get time(): string {
    return this._time;
  }
  public getSortedByDate() {
    let reminders = JSON.parse(localStorage.reminder);
    return reminders.sort((a: any, b: any) => {
      if (a._date > b._date) {
        return 1;
      }
      if (a._date < b._date) {
        return -1;
      }
      return 0;
    });
  }
}
