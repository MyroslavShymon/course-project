import { State } from "vuex-simple";
import INote from "../interfaces/INote";

export default class Note implements INote {
  @State()
  private _title: string;
  @State()
  private _description: string;
  @State()
  private _pin: boolean;
  @State()
  private _group: string;

  constructor(title: string, description: string, pin: boolean, group: string) {
    this._title = title;
    this._description = description;
    this._pin = pin;
    this._group = group;
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

  public get title(): string {
    return this._title;
  }
  public get description(): string {
    return this._description;
  }
  public get pin(): boolean {
    return this._pin;
  }
  public get group(): string {
    return this._group;
  }

  public saveLocal(note: INote, typeofNote: string): void {
    let notes = JSON.parse(localStorage[typeofNote]);
    notes.unshift(note);
    localStorage[typeofNote] = JSON.stringify(notes);
  }
  public getLocal(typeofNote: string): INote[] {
    let notes = JSON.parse(localStorage[typeofNote]);
    return notes.sort((x: any, y: any) => y._pin - x._pin);
  }
  public getNotes(typeofNote: string): INote[] {
    let notes: INote[] = JSON.parse(localStorage[typeofNote]);
    return notes;
  }
  public setNotesLocal(typeofNote: string, noteArray: INote[]): void {
    localStorage[typeofNote] = JSON.stringify(noteArray);
  }
  public sortByGroupName(typeofNote: string): INote[] {
    let notes = JSON.parse(localStorage[typeofNote]);
    return notes.sort((a: any, b: any) => {
      if (a._group > b._group) {
        return 1;
      }
      if (a._group < b._group) {
        return -1;
      }
      return 0;
    });
  }
}
