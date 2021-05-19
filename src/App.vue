<template>
  <div id="app" v-if="userRequestDone">
    <Keypress v-if="true" key-event="keyup" @success="someMethod" />
    <component :is="layout">
      <router-view />
    </component>
  </div>
  <div
    style="
      width: 100vw;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
    "
    :style="{ backgroundColor: activeColor }"
    v-else
  >
    <v-progress-circular
      :size="70"
      :width="7"
      style="color: #a279ff"
      indeterminate
    ></v-progress-circular>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { MyStore } from "@/store/store/store";
import { useStore } from "vuex-simple";

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
  private store: MyStore = useStore(this.$store);
  private userRequestDone: boolean = false;
  private activeColor =
    localStorage.themeColor === "false" ? "#ffffff" : "#363636";

  async created() {
    if (localStorage.note === undefined) {
      localStorage.note = JSON.stringify([]);
    }
    if (localStorage.task === undefined) {
      localStorage.task = JSON.stringify([]);
    }
    if (localStorage.reminder === undefined) {
      localStorage.reminder = JSON.stringify([]);
    }
    if (localStorage.notesGroupNames === undefined) {
      localStorage.notesGroupNames = JSON.stringify([]);
    }
    if (localStorage.notesTaskNames === undefined) {
      localStorage.notesTaskNames = JSON.stringify([]);
    }
    if (localStorage.notesReminderNames === undefined) {
      localStorage.notesReminderNames = JSON.stringify([]);
    }
    if (localStorage.recentLogins === undefined) {
      localStorage.recentLogins = JSON.stringify([]);
    }

    if (localStorage.isAuthOrganizer === "true") {
      await this.store.auth.getProfile();
      await this.store.auth.currentUser;
      if (this.store.auth.currentUser) {
        this.userRequestDone = true;
      }
    }
    this.userRequestDone = true;

    if (localStorage.isAuthOrganizer === undefined) {
      localStorage.isAuthOrganizer = false;
    }

    if (!localStorage.palette) {
      const themes = this.$vuetify.theme.themes;
      localStorage.palette = JSON.stringify({ themes });
      localStorage.defaultPalette = JSON.stringify({ themes });
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
