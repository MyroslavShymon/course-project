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
import { MyStore } from "@/store/store/store";
import { useStore } from "vuex-simple";

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
  private store: MyStore = useStore(this.$store);
  private languages!: { name: string; iso639_1: string }[];

  onChangeLanguage(event: string) {
    for (const language of this.languages) {
      if (language.name === event) this.$i18n.locale = language.iso639_1;
    }
  }
  onChangeCountry(event: string) {
    console.log("event", event);
  }
  created() {
    this.store.languages.created();
    this.$data.countriesNames = this.store.languages.countriesNames;
    this.$data.languagesNames = this.store.languages.languagesNames;
  }
}
</script>

<style lang="scss" scoped>
.language__inner {
  display: grid;
  grid-template-columns: 1fr 3fr;
}
</style>
