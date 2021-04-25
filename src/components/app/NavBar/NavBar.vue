<template>
  <nav class="navigation">
    <div class="menu">
      <router-link
        v-for="(link, index) of routers"
        :key="index"
        :to="link.link"
        class="menu__item"
      >
        <!-- activeClassName="{classes.menu__item_active}" -->
        <div class="menu__img"></div>
        <div class="menu__text">{{ link.text }}</div>
      </router-link>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  data() {
    return {
      routers: [
        { text: "Home", link: "/" },
        { text: "About", link: "about" },
      ],
    };
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import url("./NavBar.scss");
</style>
