<template>
  <div class="app-wrapper">
    <h2>Main Layout</h2>
    <Header />
    <NavBar />
    <router-view class="app-wrapper-content"></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NavBar from "@/components/app/NavBar/NavBar.vue";
import Header from "@/components/app/Header/Header.vue";
@Component({
  components: {
    NavBar,
    Header,
  },
})
export default class MainLayout extends Vue {}
</script>

<style lang="scss" scoped>
.app-wrapper {
  display: grid;
  grid-template-areas:
    "header header"
    "nav main";
  grid-template-rows: 70px 1fr;
  grid-template-columns: 245px 1fr;
  height: 100vh;
  font-family: "Montserrat", sans-serif;
}

.app-wrapper-content {
  grid-area: main;
}
</style>
