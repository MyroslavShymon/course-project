<template>
  <v-container fluid>
    <v-row justify="end">
      <v-menu bottom min-width="200px" rounded offset-y>
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
              <v-avatar :color="randomedColor">
                <span class="white--text headline"> DS </span>
              </v-avatar>
              <h3>Danil Sheremeta</h3>
              <p class="caption mt-1">danilsheremeta@gmail.com</p>
              <div class="d-flex flex-column">
                <v-btn depressed small tile color="default_0">
                  Edit Account
                </v-btn>
                <v-btn depressed small tile color="default_0">
                  Disconnect
                </v-btn>
              </div>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "ProfileMenu",
  data() {
    return {
      randomedColor: "",
    };
  },
  components: { ProfileMenu },
})
export default class ProfileMenu extends Vue {
  public randomedColor!: string;
  mounted() {
    this.randomedColor = [
      "#34568B",
      "#FF6F61",
      "#6B5B95",
      "#88B04B",
      "#92A8D1",
      "#955251",
      "#B565A7",
      "#009B77",
      "#DD4124",
      "#D65076",
      "#45B8AC",
      "#EFC050",
      "#5B5EA6",
      "#9B2335",
      "#55B4B0",
      "#E15D44",
      "#7FCDCD",
      "#BC243C",
      "#C3447A",
      "#98B4D4",
    ][
      Math.floor(
        Math.random() *
          [
            "#34568B",
            "#FF6F61",
            "#6B5B95",
            "#88B04B",
            "#92A8D1",
            "#955251",
            "#B565A7",
            "#009B77",
            "#DD4124",
            "#D65076",
            "#45B8AC",
            "#EFC050",
            "#5B5EA6",
            "#9B2335",
            "#55B4B0",
            "#E15D44",
            "#7FCDCD",
            "#BC243C",
            "#C3447A",
            "#98B4D4",
          ].length
      )
    ];
    // console.log(this.$vuetify);
  }
}
</script>
