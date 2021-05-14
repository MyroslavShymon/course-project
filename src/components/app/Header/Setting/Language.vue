<template>
  <v-card flat>
    <v-card-text>
      <h2 class="text--primary">{{ $t("Language and region settings") }}</h2>
      <v-divider class="mt-2"></v-divider>
      <div class="language__inner">
        <h3 class="mr-3 text--primary mt-2">{{ $t("Language and region") }}</h3>
        <p class="d-flex">
          <v-divider vertical class="mr-3"></v-divider>
          <span class="mt-2 d-block" style="width: 100%">
            <h4>{{ $t("Change language") }}</h4>
            <v-select
              @change="onChangeLanguage($event)"
              :items="languagesNames"
              v-model="selectedLang"
              :label="$t('Languages')"
              solo
            ></v-select>
            <h4>{{ $t("Change country") }}</h4>
            <v-select
              @change="onChangeCountry($event)"
              :items="countriesNames"
              v-model="selectedCountry"
              :label="$t('Country')"
              solo
            ></v-select>
          </span>
        </p>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import http from "@/global/models/fetchingData";

interface IRes {
  value: string;
  state: string;
}
@Component({
  name: "Language",
  data() {
    return {
      countries: [],
      languages: [] as { name: string; iso639_1: string }[],
      languagesNames: [] as string[],
      countriesNames: [] as string[],
      selectedLang: "",
      selectedCountry: "",
    };
  },
})
export default class Language extends Vue {
  private languages!: { name: string; iso639_1: string }[];

  onChangeLanguage(event: string) {
    for (const language of this.languages) {
      if (language.name === event) this.$i18n.locale = language.iso639_1;
    }
  }

  onChangeCountry(event: string) {
    console.log("event", event);
  }

  async created() {
    const notUniqueLanguages = [] as { name: string; iso639_1: string }[];
    const uniqueLanguages = [] as { name: string; iso639_1: string }[];

    try {
      const response = await http<IRes>("https://restcountries.eu/rest/v2/");
      this.$data.countries = response.parsedBody;
      console.log("response", response);
    } catch (response) {
      console.log("Error", response);
    }
    console.log("this.$data.countries", this.$data.countries);
    for (const country of this.$data.countries) {
      this.$data.countriesNames.push(country.name);
    }
    console.log("this.$data.countriesNames", this.$data.countriesNames);

    this.$data.countries.map((country: { languages: [] }) => {
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
    this.languages = uniqueLanguages.sort((a, b) => (a.name > b.name ? 1 : -1));
    console.log("this.languages", this.languages);
    for (const language of this.languages) {
      this.$data.languagesNames.push(language.name);
    }
  }
}
</script>

<style lang="scss" scoped>
.language__inner {
  display: grid;
  grid-template-columns: 1fr 3fr;
}
</style>
