<template>
  <div class="app-wrapper">
    <Header />
    <NavBar />
    <router-view :class="appWrapper"></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NavBar from "@/components/app/NavBar/NavBar.vue";
import Header from "@/components/app/Header/Header.vue";
import { MyStore } from "@/store/store/store";
import { useStore } from "vuex-simple";
import store from "@/store";
@Component({
  components: {
    NavBar,
    Header,
  },
})
export default class MainLayout extends Vue {
  private store: MyStore = useStore(this.$store);

  private get appWrapper() {
    return {
      "app-wrapper-content": !this.store.menuToggle,
      "app-wrapper-content-100": this.store.menuToggle,
    };
  }
}
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
  overflow-x: hidden;
}

.app-wrapper-content {
  grid-area: main;
  transition: all 1s ease-out;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
}
.app-wrapper-content-100 {
  grid-area: main;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  transform: translate(-16%);
  width: 119%;
  transition: all 1s ease-in;
  border: 0;
}
</style>
