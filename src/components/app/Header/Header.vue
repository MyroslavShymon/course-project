<template>
  <v-app-bar
    app
    clipped-left
    :class="
      $vuetify.theme.isDark === false
        ? 'background_white'
        : 'background_default_dark_0'
    "
  >
    <v-col
      cols="4"
      md="2"
      class="pa-0 d-flex align-center justify-space-between"
    >
      <v-app-bar-nav-icon
        @click="mutablePropDrawer"
        v-show="burger"
      ></v-app-bar-nav-icon>
      <div class="d-flex align-center">
        <Logo />
        <span class="organizer mx-1 primary--text d-flex">Organizer++</span>
      </div>
    </v-col>
    <Search />
    <v-spacer></v-spacer>
    <div class="d-flex justify-end v-toolbar__end-wrapper">
      <Add />
      <Notification />
      <ProfileMenu />
    </div>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop } from "vue-property-decorator";

import ProfileMenu from "./ProfileMenu/ProfileMenu.vue";
import Search from "./Search.vue";
import Notification from "./Notification.vue";
import Add from "./Add.vue";
import Logo from "@/components/app/Logo.vue";

@Component({
  name: "Header",
  components: { ProfileMenu, Search, Logo, Notification, Add },
})
export default class Header extends Vue {
  @Prop(Boolean) public burger!: boolean;
  public mutableDrawer = true;
  @Emit()
  mutablePropDrawer(): boolean {
    this.mutableDrawer = !this.mutableDrawer;
    return this.mutableDrawer;
  }
}
</script>

<style lang="scss" scoped>
.v-app-bar {
  box-shadow: none !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important;
}
</style>
