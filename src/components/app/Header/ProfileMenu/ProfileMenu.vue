<template>
  <v-container fluid>
    <v-row justify="end">
      <v-menu
        v-if="isAuth"
        bottom
        min-width="200px"
        rounded
        offset-y
        style="display: inline-block !important"
      >
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" style="height: 40px; width: 40px">
            <v-avatar :color="randomedColor" size="30">
              <span class="white--text headline body-2">{{
                userMenuAbbr
              }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center third_structure_color">
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
import { MyStore } from "@/store/store/store";
import { useStore } from "vuex-simple";

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
  private store: MyStore = useStore(this.$store);
  public randomedColor!: string;
  public isAuth: boolean = false;
  private name: string = "";
  private surname: string = "";
  private userMenuAbbr!: string;

  // public get userMenuAbbr(): string {
  //   return this.name[0].toUpperCase() + this.surname[0].toUpperCase();
  // }

  created() {
    if (localStorage.isAuthOrganizer === "true") {
      this.name = this.store.auth.currentUser.name;
      this.surname = this.store.auth.currentUser.surname;
      this.userMenuAbbr =
        this.name[0].toUpperCase() + this.surname[0].toUpperCase();
    }
    this.isAuth = localStorage.isAuthOrganizer === "false" ? false : true;
  }
  async mounted() {
    // if (await this.store.auth.currentUser) {
    //   this.name = this.store.auth.currentUser.name;
    //   this.surname = this.store.auth.currentUser.surname;
    // }
    this.randomedColor =
      randomColors[Math.floor(Math.random() * randomColors.length)];
    // console.log(this.$vuetify);
  }
}
</script>
