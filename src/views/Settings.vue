<template>
  <v-col cols="8" md="8" class="pl-0">
    <v-card>
      <v-toolbar flat color="secondary">
        <v-toolbar-title class="black--text">Help Center</v-toolbar-title>
      </v-toolbar>
      <v-tabs vertical class="text--primary" color="secondary">
        <v-tab class="d-flex justify-start text--primary" color="secondary">
          <v-icon left class="text--primary"> mdi-account </v-icon>
          Edit Profile
        </v-tab>
        <v-tab class="d-flex justify-start text--primary" color="secondary">
          <v-icon left class="text--primary"> mdi-theme-light-dark </v-icon>
          Theme
        </v-tab>
        <v-tab class="d-flex justify-start text--primary" color="secondary">
          <v-icon left class="text--primary"> mdi-earth </v-icon>
          Language
        </v-tab>

        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <p>
                Sed aliquam ultrices mauris. Donec posuere vulputate arcu. Morbi
                ac felis. Etiam feugiat lorem non metus. Sed a libero.
              </p>

              <p>
                Nam ipsum risus, rutrum vitae, vestibulum eu, molestie vel,
                lacus. Aenean tellus metus, bibendum sed, posuere ac, mattis
                non, nunc. Aliquam lobortis. Aliquam lobortis. Suspendisse non
                nisl sit amet velit hendrerit rutrum.
              </p>

              <p class="mb-0">
                Phasellus dolor. Fusce neque. Fusce fermentum odio nec arcu.
                Pellentesque libero tortor, tincidunt et, tincidunt eget, semper
                nec, quam. Phasellus blandit leo ut odio.
              </p>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <v-color-picker
                class="ma-2 d-flex flex-wrap justify-center"
                mode="hexa"
                show-swatches
                swatches-max-height="100"
                v-model="color"
              ></v-color-picker>
              <v-select
                label="Primary"
                :items="Object.keys(this.$vuetify.theme.themes.dark)"
                v-model="colorType"
                required
              ></v-select>
              <div class="d-flex">
                <v-btn @click="changeColor" color="primary">Change color</v-btn>
                <v-btn @click="saveTheme" color="primary ml-3"
                  >Save theme</v-btn
                >
              </div>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <p>
                Fusce a quam. Phasellus nec sem in justo pellentesque facilisis.
                Nam eget dui. Proin viverra, ligula sit amet ultrices semper,
                ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In
                dui magna, posuere eget, vestibulum et, tempor auctor, justo.
              </p>

              <p class="mb-0">
                Cras sagittis. Phasellus nec sem in justo pellentesque
                facilisis. Proin sapien ipsum, porta a, auctor quis, euismod ut,
                mi. Donec quam felis, ultricies nec, pellentesque eu, pretium
                quis, sem. Nam at tortor in tellus interdum sagittis.
              </p>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </v-col>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data: () => ({
    color: "",
    colorType: "primary",
  }),
  methods: {
    saveTheme() {
      const themes = this.$vuetify.theme.themes;
      localStorage.palette = JSON.stringify({ themes });
    },
    changeColor() {
      //   this.$i18n.locale = "en";
      this.$vuetify.theme.themes[this.$vuetify.theme.dark ? "dark" : "light"][
        `${this.colorType}`
      ] = this.color.substring(0, 7);
      this.$forceUpdate();
    },
  },
});
</script>

<style lang="scss">
.v-color-picker__swatches > div {
  justify-content: space-between !important;
  padding: 0 !important;
}
.v-color-picker {
  max-width: 100% !important;
}
</style>
