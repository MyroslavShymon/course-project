<template>
  <div class="app-wrapper" :class="appWrapperState">
    <HeaderAuth v-if="!isAuth" />
    <Header v-if="isAuth" />
    <NavBar />
    <router-view class="app-content" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { MyStore } from "@/store/store/store";
import { useStore } from "vuex-simple";

import store from "@/store";
import NavBar from "@/components/app/NavBar/NavBar.vue";
import Header from "@/components/app/Header/Header.vue";
import HeaderAuth from "@/components/HeaderAuth.vue";

@Component({
  components: {
    NavBar,
    Header,
    HeaderAuth,
  },
})
export default class MainLayout extends Vue {
  private store: MyStore = useStore(this.$store);

  private get isAuth(): boolean {
    return this.store.isAuth;
  }

  private get menuOpened(): boolean {
    return this.store.menuOpened;
  }

  private get appWrapperState() {
    return {
      "app-wrapper-compressed ": this.store.menuOpened,
      "app-wrapper-full": !this.store.menuOpened,
    };
  }
}
</script>

<style lang="scss" scoped>
.app {
  &-wrapper {
    height: 100%;
    display: grid;
    grid-template-rows: 74px 1fr;
    &-compressed {
      grid-template-areas:
        "header header"
        "nav main";
      grid-template-columns: 245px 1fr;
    }
    &-full {
      grid-template-areas:
        "header"
        "main";
    }
  }
  &-content {
    padding: 10px;
  }
}
</style>
