import { State } from "vuex-simple";
import INote from "../interfaces/INote";

export default class Note implements INote {
  @State()
  private _title: string;
  @State()
  private _description: string;
  @State()
  private _pin: boolean;

  constructor(title: string, description: string, pin: boolean) {
    this._title = title;
    this._description = description;
    this._pin = pin;
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

  public get title(): string {
    return this._title;
  }
  public get description(): string {
    return this._description;
  }
  public get pin(): boolean {
    return this._pin;
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
}
