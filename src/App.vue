<template>
  <div id="app">
    <v-app>
      <Header v-on:mutable-prop-drawer="burgerClicked" />
      <NavBar :drawer="drawer" />
      <v-main>
        <v-container fluid class="grey lighten-4 fill-height"> </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import Header from "@/components/app/Header.vue";
import NavBar from "@/components/app/NavBar.vue";

export default Vue.extend({
  name: "App",
  data: () => ({
    drawer: true,
  }),
  components: {
    Header,
    NavBar,
  },
  methods: {
    burgerClicked(mutableDraver: boolean): void {
      this.drawer = mutableDraver;
    },
  },
});
</script>

<style lang="scss">
.v-toolbar__content {
  padding: 4px 5px !important;
}
</style>
