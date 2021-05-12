<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    clipped
    color="second_structure_color"
  >
    <v-list dense class="pt-0 pr-3">
      <template v-for="(item, i) in items">
        <v-hover v-slot:default="{ hover }" :key="i">
          <router-link
            :to="item.link"
            style="text-decoration: none"
            v-slot="{ href, navigate, isActive, isExactActive }"
          >
            <v-list-item
              :class="[
                isActive && 'router-link-active',
                isExactActive && 'router-link-exact-active primary',
              ]"
              class="rounded-r-xl pa-0"
            >
              <v-list-item
                :href="href"
                @click="navigate"
                class="rounded-r-xl pa-0"
              >
                <v-list-item :key="i" link class="rounded-r-xl">
                  <v-list-item-action style="z-index: 20" class="my-2 mr-7">
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-item-action>
                  <v-expand-transition>
                    <v-overlay
                      absolute
                      :color="
                        $vuetify.theme.isDark === false ? 'grey lighten-2' : ''
                      "
                      class="rounded-r-xl"
                      :opacity="0.6"
                      :value="hover"
                    >
                    </v-overlay>
                  </v-expand-transition>
                  <v-list-item-content style="z-index: 20">
                    <v-list-item-title>
                      {{ $t(`menu.${item.text}`) }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item>
            </v-list-item>
          </router-link>
        </v-hover>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  name: "NavBar",
  data: () => ({
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
})
export default class NavBar extends Vue {
  @Prop(Boolean) public drawer!: boolean;
}
</script>

<style lang="scss" scoped>
.v-list-item {
  &__title {
    font-size: 16px !important;
    text-transform: uppercase;
    font-weight: 350 !important;
  }
  &::before {
    border-top-right-radius: 21px;
    border-bottom-right-radius: 21px;
  }
}
</style>
