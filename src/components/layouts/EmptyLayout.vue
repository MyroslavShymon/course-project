<template>
  <router-view></router-view>
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
