<template>
  <v-app>
    <Header :burger="false" />
    <v-main>
      <v-container
        style="border-top: 1px solid rgba(0, 0, 0, 0.1) !important"
        fluid
        class="fill-height justify-center align-start second_structure_color"
      >
        <router-view class="app-content" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

import Header from "@/components/app/Header/Header.vue";

export default Vue.extend({
  name: "App",
  components: {
    Header,
  },
});
</script>
