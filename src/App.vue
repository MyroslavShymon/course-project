<template>
  <v-app>
    {{ $t("app") }}
    <v-container>
      <v-btn class="primary rrr">Click primary</v-btn>
      <v-btn class="secondary">Click secondary</v-btn>
      <v-btn class="accent">Click accent</v-btn>
      <v-btn class="error">Click error</v-btn>
      <v-btn class="info">Click info</v-btn>
      <v-btn class="success">Click success</v-btn>
      <v-btn class="warning">Click warning</v-btn>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",

  data: () => ({
    //
  }),
});
</script>

<style lang="scss" scoped>
.rrr {
  color: $black !important;
}
</style>
