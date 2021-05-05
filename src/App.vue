<template>
  <div id="app">
    <v-app>
      <v-app-bar app clipped-left>
        <v-col cols="4" md="2" class="pa-0 d-flex align-center">
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
          <span class="organizer mx-3 primary--text d-flex">Organizer++</span>
        </v-col>
        <v-col cols="7" sm="7" md="4">
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
        <v-list dense class="pt-0 pr-3">
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
              <router-link :to="item.link" style="text-decoration: none">
                <v-list-item :key="i" link class="rounded-r-xl">
                  <v-list-item-action style="z-index: 20" class="my-2 mr-7">
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-item-action>
                  <v-expand-transition>
                    <v-overlay
                      absolute
                      color="grey lighten-2"
                      class="rounded-r-xl"
                      :opacity="0.6"
                      :value="hover"
                    >
                    </v-overlay>
                  </v-expand-transition>
                  <v-list-item-content style="z-index: 20">
                    <v-list-item-title class="black--text">
                      {{ $t(`menu.${item.text}`) }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </router-link>
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
      { icon: "task", text: "notes", link: "/" },
      { icon: "mdi-bell", text: "reminder", link: "/reminder" },
      { icon: "mdi-file-document", text: "documents", link: "/documents" },
      { icon: "mdi-notebook", text: "plans", link: "/plans" },
      { icon: "mdi-account-group", text: "chats", link: "/chats" },
      { icon: "mdi-bitcoin", text: "cost_manager", link: "/manager" },
      { icon: "mdi-calendar", text: "calendar", link: "/calendar" },
      { icon: "archive", text: "archive", link: "/archive" },
      { icon: "delete", text: "basket", link: "/basket" },
    ],
  }),
});
</script>

<style lang="scss">
.router-link-exact-active.router-link-active {
  .v-list-item {
    background-color: $primary_light;
  }
  .v-list-item__action .v-icon {
    color: $default_lighten_1;
  }
  .v-overlay__scrim {
    opacity: 0 !important;
  }
  .v-list-item__title {
    font-weight: 500 !important;
  }
}
.organizer {
  font-family: "Russo One", sans-serif !important;
  font-size: 1.5rem !important;
  font-weight: 700;
  line-height: 2rem;
  letter-spacing: 0.0125em !important;
  &::before {
    content: "";
    background-image: url("~@/assets/logo.svg");
    display: inline-block;
    width: 27px;
    height: 27px;
    margin-right: 5px;
  }
}
.v-list-item__title {
  font-size: 16px !important;
  text-transform: uppercase;
  font-weight: 350 !important;
}
.v-list-item::before {
  border-top-right-radius: 21px;
  border-bottom-right-radius: 21px;
}
.v-toolbar__content {
  padding: 4px 5px !important;
}
.v-app-bar {
  background-color: $white !important;
  box-shadow: none !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important;
}
</style>
