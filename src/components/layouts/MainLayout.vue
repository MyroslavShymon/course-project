<template>
  <!-- <div class="app-wrapper" :class="appWrapperState">
    <HeaderAuth v-if="!isAuth" />
    <Header v-if="isAuth" />
    <NavBar />
    <router-view class="app-content" />
  </div> -->
  <div></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import { MyStore } from "@/store/store/store";
// import { useStore } from "vuex-simple";

import NavBar from "@/components/app/NavBar/NavBar.vue";
import Header from "@/components/app/Header/Header.vue";
import HeaderAuth from "@/components/app/HeaderAuth.vue";

@Component({
  components: {
    NavBar,
    Header,
    HeaderAuth,
  },
})
export default class MainLayout extends Vue {
  //   private store: MyStore = useStore(this.$store);
  //   private get isAuth(): boolean {
  //     return this.store.isAuth;
  //   }
  //   private get menuOpened(): boolean {
  //     return this.store.menuOpened;
  //   }
  //   private get appWrapperState() {
  //     return {
  //       "app-wrapper-compressed ": this.store.menuOpened,
  //       "app-wrapper-full": !this.store.menuOpened,
  //     };
  //   }
}
</script>
