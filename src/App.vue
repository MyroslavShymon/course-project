<template>
  <div id="app">
    <Keypress v-if="true" key-event="keyup" @success="someMethod" />
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import EmptyLayout from "@/components/layouts/EmptyLayout.vue";
import MainLayout from "@/components/layouts/MainLayout.vue";

@Component({
  computed: {
    layout() {
      return (this.$route.meta.layout || "empty") + "-layout";
    },
  },
  components: {
    EmptyLayout,
    MainLayout,
    Keypress: () => import("vue-keypress"),
  },
  methods: {
    someMethod(response) {
      if (
        response.event.code === "KeyY" &&
        response.event.shiftKey == true &&
        response.event.altKey == true
      ) {
        console.log("Create task", response);
      }
      if (
        response.event.code === "KeyU" &&
        response.event.shiftKey == true &&
        response.event.altKey == true
      ) {
        console.log("Create reminder");
      }
      if (
        response.event.code === "KeyI" &&
        response.event.shiftKey == true &&
        response.event.altKey == true
      ) {
        console.log("Create documents");
      }
      if (
        response.event.code === "KeyO" &&
        response.event.shiftKey == true &&
        response.event.altKey == true
      ) {
        console.log("Create plans");
      }
    },
  },
})
export default class App extends Vue {
  created() {
    if (!localStorage.palette) {
      const themes = this.$vuetify.theme.themes;
      localStorage.palette = JSON.stringify({ themes });
      return;
    }
    this.$vuetify.theme.themes.dark = JSON.parse(
      localStorage.palette
    ).themes.dark;
    this.$vuetify.theme.themes.light = JSON.parse(
      localStorage.palette
    ).themes.light;

    localStorage.themeColor == "false"
      ? (this.$vuetify.theme.dark = false)
      : (this.$vuetify.theme.dark = true);
  }
}
</script>
