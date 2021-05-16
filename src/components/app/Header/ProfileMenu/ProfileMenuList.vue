<template>
  <div class="third_structure_color">
    <template v-for="(item, i) in items">
      <v-divider v-if="item.divider" :key="i" class="my-2 px-2"></v-divider>
      <router-link
        v-else-if="item.link"
        :key="i"
        :to="item.linkTo"
        style="text-decoration: none; width: 100%"
        class="d-flex justify-start text--primary"
      >
        <v-btn
          depressed
          small
          tile
          style="width: 100%"
          class="justify-start px-2"
          color="third_structure_color"
        >
          <v-icon small class="pr-2">{{ item.icon }}</v-icon>

          {{ $t(`profileMenuList.${item.text}`) }}
        </v-btn>
      </router-link>
      <v-btn
        v-else-if="item.exit"
        @click="logoutUser"
        :key="i"
        depressed
        small
        tile
        style="width: 100%"
        class="justify-start px-2"
        color="third_structure_color"
      >
        <v-icon small class="pr-2">{{ item.icon }}</v-icon>

        {{ $t(`profileMenuList.${item.text}`) }}
      </v-btn>
      <div
        v-else-if="item.hover"
        :key="i"
        @mouseover="upHere = true"
        @mouseleave="upHere = false"
      >
        <HelpAndAccessability :item="item" :upHere="upHere" />
      </div>

      <v-dialog
        v-else
        :key="i"
        v-model="dialog"
        max-width="600px"
        :retain-focus="false"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            depressed
            small
            v-bind="attrs"
            v-on="on"
            tile
            color="third_structure_color"
            style="width: 100%"
            class="d-flex justify-start px-2"
          >
            <v-icon small class="pr-2">{{ item.icon }}</v-icon>
            {{ $t(`profileMenuList.${item.text}`) }}
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{
              $t("profileMenuList.display_&_accessibilty")
            }}</span>
            <v-spacer></v-spacer>
            <v-card-actions>
              <v-btn small fab text @click="dialog = false">
                <v-icon x-large color="accent">mdi-close</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card-title>
          <v-card-text>
            <v-container class="px-0">
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <div class="title">{{ $t("display") }}</div>
                  <v-radio-group v-model="radioGroup">
                    <v-radio
                      :label="$t('light') + ' ' + $t('theme')"
                      value="light"
                      color="accent"
                    ></v-radio
                    ><v-radio
                      :label="$t('dark') + ' ' + $t('theme')"
                      value="dark"
                      color="accent"
                    ></v-radio>
                  </v-radio-group>
                </v-col>
                <v-col cols="12" sm="6" md="8">
                  <div class="title">{{ $t("accessibility") }}</div>
                  <span class="font-italic">
                    If you do not want to use the mouse,<br />
                    you can press the keys. So even faster!
                  </span>
                  <Combinations />
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions class="px-6">
            <v-spacer></v-spacer>
            <v-btn color="accent " text @click="changeTheme">
              {{ $t("save") }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { MyStore } from "@/store/store/store";
import { useStore } from "vuex-simple";

import Combinations from "./Combinations.vue";
import HelpAndAccessability from "./HelpAndAccessability.vue";

@Component({
  name: "ProfileMenuList",
  components: { Combinations, HelpAndAccessability },
  data() {
    return {
      dialog: false,
      radioGroup: "dark",
      upHere: false,
      items: [
        { divider: true },
        { text: "your_notes", link: true, linkTo: "/", icon: "task" },
        {
          text: "your_reminds",
          link: true,
          linkTo: "/reminder",
          icon: "mdi-bell",
        },
        {
          text: "your_documents",
          link: true,
          linkTo: "/documents",
          icon: "mdi-file-document",
        },
        {
          text: "your_plans",
          link: true,
          linkTo: "/plans",
          icon: "mdi-notebook",
        },
        { divider: true },
        { text: "settings", link: true, linkTo: "/settings", icon: "mdi-cog" },
        {
          text: "display_&_accessibilty",
          dialog: true,
          icon: "mdi-white-balance-sunny",
        },
        {
          text: "help_&_support",
          hover: true,
          icon: "mdi-help-circle-outline",
        },
        { text: "log_out", icon: "mdi-exit-to-app", exit: "true" },
      ],
    };
  },
  methods: {
    changeTheme() {
      this.$data.dialog = false;
      if (this.$data.radioGroup == "light") {
        this.$vuetify.theme.dark = false;
        localStorage.themeColor = String(this.$vuetify.theme.dark);
        this.$data.items.forEach(
          (item: { text: string; dialog: boolean; icon: string }) => {
            if (item.dialog === true) {
              item.icon = "mdi-weather-night";
            }
          }
        );
      } else {
        this.$vuetify.theme.dark = true;
        localStorage.themeColor = String(this.$vuetify.theme.dark);
        this.$data.items.forEach(
          (item: { text: string; dialog: boolean; icon: string }) => {
            if (item.dialog === true) {
              item.icon = "mdi-white-balance-sunny";
            }
          }
        );
      }
    },
  },
})
export default class ProfileMenuList extends Vue {
  private store: MyStore = useStore(this.$store);
  logoutUser() {
    this.store.auth.logout();
  }
}
</script>

<style>
.left-1241 {
  left: 1241px !important;
}
.left-1141 {
  left: 1141px !important;
}
</style>
