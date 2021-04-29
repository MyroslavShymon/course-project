<template>
  <nav class="navigation" :class="showNavigation">
    <div class="menu">
      <md-button
        class="md-button menu__item menu__button"
        v-for="(link, index) of routers"
        :key="index"
        :disabled="link.disabled"
      >
        <router-link
          :to="link.link"
          class="menu__item_link"
          active-class="menu__item_active"
          exact
        >
          <div class="menu__img">
            <md-icon>{{ link.icon }}</md-icon>
          </div>
          <div class="menu__text">{{ link.text }}</div>
        </router-link></md-button
      >
    </div>
    <span style="display:none">{{ isAuth }}</span>
    <!-- <md-drawer :md-active.sync="showNavigation" md-swipeable> </md-drawer> -->
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { MyStore } from "@/store/store/store";
import { useStore } from "vuex-simple";

import IRouter from "@/store/interfaces/IRouter";

@Component
export default class NavBar extends Vue {
  public store: MyStore = useStore(this.$store);
  private get showNavigation() {
    return {
      transformTranslateX100: !this.store.menuOpened,
      transformTranslateX0: this.store.menuOpened,
    };
  }

  private get routers(): IRouter[] {
    return this.store.routers;
  }

  private get isAuth(): boolean {
    if (this.store.isAuth == true) {
      this.store.routers.map((router: IRouter) => {
        router.disabled = null;
      });
    }
    return this.store.isAuth;
  }

  // private getAuth(): void {

  // }
}
</script>

<style lang="scss">
@import "./NavBar.scss";
</style>
