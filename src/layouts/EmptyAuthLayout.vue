<template>
  <div class="grey-light empty-auth-layout">
    <HeaderAuth class="empty-auth-layout__header" />
    <div class="empty-layout-inner">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import Footer from "@/components/app/Footer.vue";
import HeaderAuth from "@/components/app/HeaderAuth.vue";

@Component({
  components: {
    Footer,
    HeaderAuth,
  },
})
export default class EmptyAuthLayout extends Vue {}
</script>

<style lang="scss" scoped>
.empty-auth-layout {
  &__header {
    position: sticky;
    top: 0;
  }
}
.empty-layout-inner {
  width: 100%;
  padding: 120px 20px;
}
</style>
