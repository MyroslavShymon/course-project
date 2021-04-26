<template>
  <header class="header">
    <div class="header__logo-wrapper">
      <md-button class="md-icon-button" @click="toggleClasses">
        <md-icon>menu</md-icon>
      </md-button>
      <router-link to="/task" class="header__logo">ToDoList+</router-link>
    </div>
    <div class="header__inner">
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
  //   methods: {
  //     tranformForm() {
  //       this.clicked = true;
  //     },
  //   },
  //   computed: {
  // classObject: function() {
  //   return {
  //     search: this.clicked == false,
  //     search_active: this.clicked == true,
  //   };
  // },
  //   },
})
export default class Header extends Vue {
  public store: MyStore = useStore(this.$store);
  private toggleClasses(): void {
    this.store.menuToggle = !this.store.menuToggle;
  }

  // private clicked = false;
  // private searchQuery!: string;
  // private tranformForm() {
  //   console.log("clicked", this.clicked);
  //   this.clicked = true;
  // }
  // private get classObject() {
  //   const element = this.$refs.searchInput as HTMLElement;
  //   console.log("this.searchQuery", this.searchQuery, element.classList);
  //   return {
  //     search__main: true,
  //     search_passive: this.clicked == false,
  //     search_active: this.clicked == true,
  //   };
  // }
}
</script>

<style lang="scss">
@import "./Header.scss";
</style>
