<template>
  <v-footer padless>
    <v-row justify="center" no-gutters>
      <router-link v-for="link in links" :key="link.name" :to="link.link">
        <v-btn text rounded class="my-1">
          {{ $t(`menu.${link.name}`) }}
        </v-btn></router-link
      >
      <v-col class="py-1 text-center" cols="12">dzfdf </v-col>
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
  created() {
    console.log(this.$i18n);
  }
}
</script>
