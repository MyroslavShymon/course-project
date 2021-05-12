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
              <div class="d-flex flex-column">
                <div class="themes d-flex">
                  <div>
                    <div>Current palette</div>
                    <div class="theme">
                      <v-tooltip
                        bottom
                        v-for="color of currentCollors"
                        :key="color"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            tile
                            :color="color"
                            class="theme-color"
                            :class="'theme-color-' + `${color}`"
                            v-bind="attrs"
                            v-on="on"
                            @click="getColor($event)"
                          >
                          </v-btn>
                        </template>
                        <span>{{ color }}</span>
                      </v-tooltip>
                    </div>
                  </div>
                  <div>
                    <div>Default palette</div>
                    <div class="theme ml-2">
                      <v-tooltip
                        bottom
                        v-for="color of defaultCollors"
                        :key="color.color"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            tile
                            :style="{ backgroundColor: color.color }"
                            class="theme-color"
                            :class="'theme-color-' + `${color.colorType}`"
                            v-bind="attrs"
                            v-on="on"
                          >
                          </v-btn>
                        </template>
                        <span>{{ color.colorType }}</span>
                      </v-tooltip>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex">
                <v-btn
                  medium
                  outlined
                  tile
                  @click="changeColor"
                  color="primary"
                  small
                  >Change color</v-btn
                >
                <v-btn
                  medium
                  outlined
                  tile
                  @click="saveTheme"
                  color="primary ml-3"
                  small
                  >Save theme</v-btn
                >
                <v-btn
                  medium
                  outlined
                  tile
                  @click="setDefaultTheme"
                  color="primary ml-3"
                  small
                  >Set default theme</v-btn
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
    currentCollors: [
      "primary",
      "secondary",
      "accent",
      "error",
      "info",
      "success",
      "warning",
    ] as string[],
    defaultCollors: [] as { colorType: string; color: string }[],
  }),
  created() {
    for (let colorType in JSON.parse(localStorage.defaultPalette).themes.dark) {
      let color: string = JSON.parse(localStorage.defaultPalette).themes.dark[
        colorType
      ].toLowerCase();
      this.defaultCollors.push({ colorType, color });
    }
    console.log("aaaa", this.defaultCollors);
  },

  methods: {
    getColor(event: any) {
      this.color = String(
        this.$vuetify.theme.themes[this.$vuetify.theme.dark ? "dark" : "light"][
          event.explicitOriginalTarget.__vue__.color
        ]
      );
      this.colorType = event.explicitOriginalTarget.__vue__.color;
    },
    saveTheme() {
      const themes = this.$vuetify.theme.themes;
      localStorage.palette = JSON.stringify({ themes });
    },
    changeColor() {
      //   this.$i18n.locale = "en";
      this.$vuetify.theme.themes[this.$vuetify.theme.dark ? "dark" : "light"][
        `${this.colorType}`
      ] = this.color.substring(0, 7);
      // this.$forceUpdate();
    },
    setDefaultTheme() {
      this.$vuetify.theme.themes.dark = JSON.parse(
        localStorage.defaultPalette
      ).themes.dark;
      this.$vuetify.theme.themes.light = JSON.parse(
        localStorage.defaultPalette
      ).themes.light;
    },
  },
});
</script>

<style lang="scss">
.themes {
  height: 130px;
  margin: 0 0 10px 0;
}
.theme {
  display: grid;
  grid-template-columns: 30% 30% 15% 15%;
  grid-template-rows: 30% 30% 20%;
  grid-gap: 5px;
  width: 200px;
  grid-template-areas:
    "primary primary accent secondary"
    "primary primary accent secondary"
    "error info success warning";
  height: 100%;
  &-color {
    width: 100% !important;
    height: 100% !important;
    min-width: 0 !important;
    padding: 0 !important;
    &-primary {
      grid-area: primary;
      background-color: $primary;
    }
    &-secondary {
      grid-area: secondary;
      background-color: $secondary;
    }
    &-accent {
      grid-area: accent;
      background-color: $accent;
    }
    &-error {
      grid-area: error;
      background-color: $error;
    }
    &-info {
      grid-area: info;
      background-color: $info;
    }
    &-success {
      grid-area: success;
      background-color: $success;
    }
    &-warning {
      grid-area: warning;
      background-color: $warning;
    }
    &-first_structure_color {
      display: none;
    }
    &-second_structure_color {
      display: none;
    }
    &-third_structure_color {
      display: none;
    }
  }
}
.v-color-picker__swatches > div {
  justify-content: space-between !important;
  padding: 0 !important;
}
.v-color-picker {
  max-width: 100% !important;
}
</style>
