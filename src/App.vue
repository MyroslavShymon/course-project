<template>
  <div id="app">
    <v-app>
      <v-app-bar app clipped-left color="primary">
        <v-col cols="4" md="2" class="pa-0 d-flex align-center">
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
          <span class="organizer ml-3 mr-5">Organizer++</span>
        </v-col>
        <v-col cols="7" sm="7" md="4" class="pa-0">
          <v-text-field
            solo-inverted
            flat
            hide-details
            label="Search"
            prepend-inner-icon="search"
          ></v-text-field>
        </v-col>
        <v-spacer></v-spacer>
      </v-app-bar>
      <v-navigation-drawer v-model="drawer" app clipped color="white">
        <v-list dense class="pt-0">
          <template v-for="(item, i) in items">
            <v-hover v-slot:default="{ hover }" :key="i">
              <!-- <v-row v-if="item.heading" :key="i" align="center">
                <v-col cols="6">
                  <v-subheader v-if="item.heading">
                    {{ item.heading }}
                  </v-subheader>
                </v-col>
                <v-col cols="6" class="text-right">
                  <v-btn small text>edit</v-btn>
                </v-col>
              </v-row>
              <v-divider
                v-else-if="item.divider"
                :key="i"
                dark
                class="my-4"
              ></v-divider> -->
              <!-- v-else  -->

              <v-list-item :key="i" link class="rounded-r-xl">
                <v-list-item-action style="z-index: 20">
                  <v-icon color="grey">{{ item.icon }}</v-icon>
                </v-list-item-action>
                <v-expand-transition>
                  <v-overlay
                    absolute
                    color="grey rounded-r-xl"
                    :opacity="0.6"
                    :value="hover"
                  >
                  </v-overlay>
                </v-expand-transition>
                <v-list-item-content style="z-index: 20">
                  <v-list-item-title class="black--text">
                    {{ item.text }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-hover>
          </template>
        </v-list>
      </v-navigation-drawer>
    </v-app>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",
  //{{ $t("app") }}
  data: () => ({
    drawer: null,
    items: [
      { icon: "lightbulb_outline", text: "Notes" },
      { icon: "touch_app", text: "Reminders" },
      { icon: "add", text: "Create new label" },
      { icon: "archive", text: "Archive" },
      { icon: "delete", text: "Trash" },
      { icon: "settings", text: "Settings" },
      { icon: "chat_bubble", text: "Trash" },
      { icon: "help", text: "Help" },
      { icon: "phonelink", text: "App downloads" },
      { icon: "keyboard", text: "Keyboard shortcuts" },
    ],
  }),
});
</script>

<style lang="scss">
.organizer {
  font-family: "Russo One", sans-serif !important;
  font-size: 1.25rem !important;
  font-weight: 500;
  line-height: 2rem;
  letter-spacing: 0.0125em !important;
}
.v-list-item::before {
  border-top-right-radius: 21px;
  border-bottom-right-radius: 21px;
}
</style>
