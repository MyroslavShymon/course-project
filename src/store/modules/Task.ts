import { State } from "vuex-simple";
import Note from "./Note";

export default class Task extends Note {
  @State()
  private _priority: number;

  constructor(
    title: string,
    description: string,
    pin: boolean,
    group: string,
    priority: number
  ) {
    super(title, description, pin, group);
    this._priority = priority;
  }

  public set title(title: string) {
    this._title = title;
  }
  public set description(description: string) {
    this._description = description;
  }
  public set pin(pin: boolean) {
    this._pin = pin;
  }
  public set group(group: string) {
    this._group = group;
  }
  public set priority(priority: number) {
    this._priority = priority;
  }

  public get title(): string {
    return this._title;
  }
  public get description(): string {
    return this._description;
  }
  public get pin(): boolean {
    return this._pin;
  }
  public get priority(): number {
    return this._priority;
  }
  public get group(): string {
    return this._group;
  }

  public saveLocal(note: INote) {
    let notes = JSON.parse(localStorage.note);
    notes.unshift(note);
    localStorage.note = JSON.stringify(notes);
  }
  public getLocal(): INote[] {
    let notes = JSON.parse(localStorage.note);
    return notes.sort((x: any, y: any) => y._pin - x._pin);
  }
  public sortByPriority(): INote[] {
    let notes = JSON.parse(localStorage.note);
    return notes.sort((x: any, y: any) => y._priority - x._priority);
  }
  public getNotes(): INote[] {
    let notes = JSON.parse(localStorage.note);
    return notes;
  }
}
