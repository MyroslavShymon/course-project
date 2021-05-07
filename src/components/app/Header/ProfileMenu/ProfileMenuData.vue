<template>
  <div class="d-flex align-center justify-center flex-column">
    <div class="d-flex px-2 align-center" style="width: 100%">
      <v-avatar :color="randomedColor" size="32">
        <span class="white--text headline body-1"> DS </span>
      </v-avatar>
      <h3 class="pl-1 body-2">Danil Sheremeta</h3>
    </div>
    <p class="caption mb-0 px-2 d-flex" style="width: 100%">
      danilsheremeta@gmail.com
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  name: "ProfileMenuData",
})
export default class ProfileMenuData extends Vue {
  @Prop(String) public randomedColor!: string;
}
</script>
