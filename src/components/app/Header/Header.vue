<template>
  <header class="header" :class="{ 'border-show': !menuOpened }">
    <div class="header__logo-wrapper">
      <md-button class="md-icon-button" @click="toggleClasses">
        <md-icon>menu</md-icon>
      </md-button>
      <router-link to="/" class="logo">ToDoList+</router-link>
      <span class="header__logo-lang">UA</span>
    </div>
    <div class="header__inner" :class="{ 'border-show': menuOpened }">
      <form method="get" action="" class="search">
        <a class="search__loupe search-img"></a>
        <input
          type="search"
          name="search"
          placeholder="Пошук..."
          class="search__main search_passive"
        />
        <!-- v-model="searchQuery"
          :class="classObject"
          @click="tranformForm"
          ref="searchInput" -->
        <div class="search__images-wrapper">
          <a class="search__nine-grid search-img"></a>
          <a class="search__close search-img"></a>
        </div>
      </form>

      <div>aaaaaaaaaaaaaaaaaaaaaaa</div>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { MyStore } from "@/store/store/store";
import { useStore } from "vuex-simple";
@Component({
  data() {
    return {
      searchQuery: "",
    };
  },
})
export default class Header extends Vue {
  public store: MyStore = useStore(this.$store);
  private toggleClasses(): void {
    this.store.menuOpened = !this.store.menuOpened;
  }
  private get menuOpened() {
    return this.store.menuOpened;
  }
}
</script>

<style lang="scss">
@import "./Header.scss";
.border-show {
  border-bottom: 1px solid $border-main-grey;
}
</style>
