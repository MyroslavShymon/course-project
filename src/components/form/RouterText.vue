<template>
  <router-link :to="link" class="form__forgot">
    <span>
      {{ text }}
    </span>
  </router-link>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class RouterText extends Vue {
  @Prop(String) readonly link: string | undefined;
  @Prop(String) readonly text: string | undefined;
}
</script>
