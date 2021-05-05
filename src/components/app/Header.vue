<template>
  <v-app-bar app clipped-left>
    <v-col cols="4" md="2" class="pa-0 d-flex align-center">
      <v-app-bar-nav-icon @click="mutablePropDrawer"></v-app-bar-nav-icon>
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
</template>

<script lang="ts">
import { Component, Vue, Emit } from "vue-property-decorator";

@Component({
  name: "Header",
})
export default class Header extends Vue {
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
  background-color: $white !important;
  box-shadow: none !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important;
}
</style>
