<template>
  <div class="empty-layout grey-light">
    <div class="empty-layout-inner">
      <router-view></router-view>
    </div>
    <Footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import Footer from "@/components/app/Footer.vue";

@Component({
  components: {
    Footer,
  },
})
export default class EmptyLayout extends Vue {}
</script>

<style lang="scss">
.empty-layout-inner {
  width: 100%;
}
</style>
