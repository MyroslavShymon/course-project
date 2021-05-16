<template>
  <v-badge bottom overlap class="d-flex mr-3 align-center">
    <template v-slot:badge>
      <div :class="badgeIndex" class="font-weight-bold">1</div>
    </template>
    <v-btn icon x-small>
      <v-icon class="text--primary">mdi-bell-outline</v-icon>
    </v-btn>
  </v-badge>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      badgeIndex:
        (localStorage.isAuthOrganizer === "false" ? "badge-index-inner" : "") ||
        "",
    };
  },
});
</script>

<style lang="scss" scoped>
.badge-index-inner {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: 100%;
  height: 100%;
}
</style>
