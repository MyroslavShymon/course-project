<template>
  <md-button
    type="submit"
    class="md-raised md-primary"
    variant="success"
    :disabled="invalid && btnShow"
    >{{ btnName }}</md-button
  >
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class ButtonSubmit extends Vue {
  @Prop(String) readonly btnName: string | undefined;
  @Prop(Boolean) readonly invalid: boolean | undefined;
  @Prop(Boolean) readonly btnShow: boolean | undefined;
}
</script>
