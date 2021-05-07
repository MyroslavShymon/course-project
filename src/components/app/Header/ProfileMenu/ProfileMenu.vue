<template>
  <v-container fluid>
    <v-row justify="end">
      <v-menu
        bottom
        min-width="200px"
        rounded
        offset-y
        style="display: inline-block !important"
      >
        <template v-slot:activator="{ on }">
          <v-btn icon x-large v-on="on">
            <v-avatar :color="randomedColor" size="48">
              <span class="white--text headline"> DS</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <ProfileMenuData :randomed-color="randomedColor" />
              <ProfileMenuList />
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import ProfileMenuData from "./ProfileMenuData.vue";
import ProfileMenuList from "./ProfileMenuList.vue";

import { randomColors } from "@/global/constants";

@Component({
  name: "ProfileMenu",
  data() {
    return {
      randomedColor: "",
    };
  },
  components: { ProfileMenuData, ProfileMenuList },
})
export default class ProfileMenu extends Vue {
  public randomedColor!: string;
  mounted() {
    this.randomedColor =
      randomColors[Math.floor(Math.random() * randomColors.length)];
    // console.log(this.$vuetify);
  }
}
</script>
