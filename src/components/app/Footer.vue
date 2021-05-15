<template>
  <v-footer padless>
    <v-row justify="center" no-gutters>
      <router-link v-for="link in links" :key="link.name" :to="link.link">
        <v-btn text rounded class="my-1">
          {{ $t(`menu.${link.name}`) }}
        </v-btn></router-link
      >
      <v-col class="py-1 text-center" cols="12">
        <span
          v-for="languageName of languagesNames"
          :key="languageName.name"
          class="px-2 language"
          @click="changeLanguage(languageName.name)"
          >{{ languageName.name }}</span
        >
      </v-col>
    </v-row>
  </v-footer>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({
  name: "Footer",
  data() {
    return {
      languagesNames: [
        { name: "English", iso639_1: "en" },
        { name: "Ukrainian", iso639_1: "ua" },
        { name: "Russian", iso639_1: "ru" },
        { name: "Polish", iso639_1: "pl" },
      ],
      links: [
        { name: "notes", link: "/" },
        { name: "reminder", link: "/reminder" },
        { name: "documents", link: "/documents" },
        { name: "plans", link: "/plans" },
      ] as { name: string; link: string }[],
    };
  },
})
export default class Footer extends Vue {
  private changeLanguage(name: string) {
    for (const language of this.$data.languagesNames) {
      if (language.name === name) this.$i18n.locale = language.iso639_1;
    }
  }
}
</script>

<style lang="scss" scoped>
.language {
  cursor: pointer;
  text-decoration: underline;
  text-decoration-color: transparent;
  transition: 0.5s;
  text-align: center;
  &:hover {
    text-decoration-color: $secondary;
  }
}
</style>
