<template>
  <v-app>
    <Header :burger="false" />
    <v-main>
      <v-container
        fluid
        class="fill-height justify-center align-start"
        :class="
          $vuetify.theme.isDark === false
            ? 'background_white'
            : 'background_default_dark_1'
        "
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
