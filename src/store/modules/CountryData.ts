import { Action, Getter, Mutation, State } from "vuex-simple";
import http from "@/global/models/fetchingData";

type countries = { name: string; languages: [] }[];
type language = { name: string; iso639_1: string }[];

export default class CountyData {
  @State()
  private _countries: countries | undefined = [];
  @State()
  private _languages: language = [];
  @State()
  private _languagesNames: string[] = [];
  @State()
  private _countriesNames: string[] = [];

  async created() {
    const notUniqueLanguages = [] as language;
    const uniqueLanguages = [] as language;

    try {
      const response = await http<countries>(
        "https://restcountries.eu/rest/v2/"
      );
      this._countries = response.parsedBody;
    } catch (response) {
      console.log("Error", response);
    }
    for (const country of this._countries || []) {
      this._countriesNames.push(country.name);
    }

    (this._countries || []).map((country: { languages: [] }) => {
      country.languages.map((language: { name: string; iso639_1: string }) => {
        const name: string = language.name;
        const iso639_1: string = language.iso639_1;
        notUniqueLanguages.push({ name, iso639_1 });
      });
    });
    const mapLangs = new Map();
    for (const item of notUniqueLanguages) {
      if (!mapLangs.has(item.name)) {
        mapLangs.set(item.name, true);
        uniqueLanguages.push({
          name: item.name,
          iso639_1: item.iso639_1,
        });
      }
    }
    this._languages = uniqueLanguages.sort((a, b) =>
      a.name > b.name ? 1 : -1
    );

    for (const language of this._languages) {
      this._languagesNames.push(language.name);
    }
  }
  public get countriesNames(): string[] {
    return this._countriesNames;
  }
  public get languagesNames(): string[] {
    return this._languagesNames;
  }
}
