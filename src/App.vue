<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import EmptyLayout from "@/layouts/EmptyLayout.vue";
import MainLayout from "@/layouts/MainLayout.vue";
@Component({
  computed: {
    layout() {
      return (this.$route.meta.layout || "empty") + "-layout";
    },
  },
  components: {
    EmptyLayout,
    MainLayout,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss"></style>
