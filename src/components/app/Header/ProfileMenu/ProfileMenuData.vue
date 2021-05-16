<template>
  <div class="d-flex align-center justify-center flex-column">
    <div class="d-flex px-2 align-center" style="width: 100%">
      <v-avatar :color="randomedColor" size="32">
        <span class="white--text headline body-1">
          {{ name[0].toUpperCase() }}{{ surname[0].toUpperCase() }}
        </span>
      </v-avatar>
      <h3 class="pl-1 body-2">{{ name }} {{ surname }}</h3>
    </div>
    <p class="caption mb-0 px-2 d-flex" style="width: 100%">
      {{ email }}
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { MyStore } from "@/store/store/store";
import { useStore } from "vuex-simple";

@Component({
  name: "ProfileMenuData",
})
export default class ProfileMenuData extends Vue {
  private store: MyStore = useStore(this.$store);
  private email!: string;
  private name!: string;
  private surname!: string;
  created() {
    this.email = this.store.auth.currentUser.email;
    this.name = this.store.auth.currentUser.name;
    this.surname = this.store.auth.currentUser.surname;
  }
  @Prop(String) public randomedColor!: string;
}
</script>
