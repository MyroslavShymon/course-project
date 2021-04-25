<template>
  <div class="empty-layout grey-light">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class EmptyLayout extends Vue {}
</script>

<style lang="scss">
//
</style>
