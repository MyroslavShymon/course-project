<template>
  <v-app-bar app clipped-left color="first_structure_color">
    <v-col
      cols="4"
      md="2"
      class="pa-0 d-flex align-center justify-space-between"
    >
      <v-app-bar-nav-icon
        @click="mutablePropDrawer"
        v-show="burger"
      ></v-app-bar-nav-icon>
      <Logo />
    </v-col>
    <Search />
    <v-spacer></v-spacer>
    <div class="d-flex justify-end v-toolbar__end-wrapper">
      <Add />
      <Notification />
      <ProfileMenu v-if="isAuth" />
      <HeaderLogin v-if="!isAuth" />
    </div>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop } from "vue-property-decorator";

import ProfileMenu from "./ProfileMenu/ProfileMenu.vue";
import Search from "./Search.vue";
import HeaderLogin from "./HeaderLogin.vue";
import Notification from "./Notification.vue";
import Add from "./Add.vue";
import Logo from "@/components/app/Logo.vue";

@Component({
  name: "Header",
  components: { ProfileMenu, Search, Logo, Notification, HeaderLogin, Add },
})
export default class Header extends Vue {
  public isAuth: boolean = false;
  @Prop(Boolean) public burger!: boolean;
  public mutableDrawer = true;
  @Emit()
  mutablePropDrawer(): boolean {
    this.mutableDrawer = !this.mutableDrawer;
    return this.mutableDrawer;
  }
  created() {
    this.isAuth = localStorage.isAuthOrganizer === "false" ? false : true;
  }
}
</script>

<style lang="scss" scoped>
.v-app-bar {
  box-shadow: none !important;
}
</style>
