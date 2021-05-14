<template>
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
        :label="$t('color.primary')"
        :items="selectedColors"
        v-model="colorType"
        required
      ></v-select>
      <div class="d-flex flex-column">
        <div class="themes d-flex">
          <div>
            <div>{{ $t("Current palette") }}</div>
            <div class="theme">
              <v-tooltip bottom v-for="color of currentCollors" :key="color">
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
                <span>{{ $t(`color.${color}`) }}</span>
              </v-tooltip>
            </div>
          </div>
          <div>
            <div>{{ $t("Default palette") }}</div>
            <div class="theme">
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
                <span>{{ $t(`color.${color.colorType}`) }}</span>
              </v-tooltip>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex themes__buttons">
        <v-btn
          medium
          outlined
          tile
          v-for="button of buttons"
          :key="button.text"
          @click="runButtonsMethods(button.function_name)"
          color="primary"
          small
          >{{ $t(`${button.text}`) }}</v-btn
        >
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { TranslateResult } from "node_modules/vue-i18n/types";
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "Theme",
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
    buttons: [
      { text: "Change color", function_name: "changeColor" },
      { text: "Save theme", function_name: "saveTheme" },
      { text: "Set default theme", function_name: "setDefaultTheme" },
    ] as { text: string; function_name: string }[],
  }),
  created() {
    for (let colorType in JSON.parse(localStorage.defaultPalette).themes.dark) {
      let color: string = JSON.parse(localStorage.defaultPalette).themes.dark[
        colorType
      ].toLowerCase();
      this.$data.defaultCollors.push({ colorType, color });
    }
  },
})
export default class Theme extends Vue {
  private get selectedColors(): TranslateResult[] {
    return Object.keys(this.$vuetify.theme.themes.dark).map(
      (color: string): TranslateResult => this.$t(`color.${color}`)
    );
  }

  private runButtonsMethods(method: string): void {
    this[method as keyof Theme]();
  }
  private getColor(event: any): void {
    /////////////////////////////fix any
    console.log(event);

    this.$data.color = String(
      this.$vuetify.theme.themes[this.$vuetify.theme.dark ? "dark" : "light"][
        event.explicitOriginalTarget.__vue__.color
      ]
    );
    this.$data.colorType = event.explicitOriginalTarget.__vue__.color;
  }
  private saveTheme(): void {
    const themes = this.$vuetify.theme.themes;
    localStorage.palette = JSON.stringify({ themes });
  }
  private changeColor(): void {
    //   this.$i18n.locale = "en";
    this.$vuetify.theme.themes[this.$vuetify.theme.dark ? "dark" : "light"][
      `${this.$data.colorType}`
    ] = this.$data.color.substring(0, 7);
  }
  private setDefaultTheme(): void {
    this.$vuetify.theme.themes.dark = JSON.parse(
      localStorage.defaultPalette
    ).themes.dark;
    this.$vuetify.theme.themes.light = JSON.parse(
      localStorage.defaultPalette
    ).themes.light;
  }
}
</script>

<style lang="scss">
.themes {
  height: 130px;
  margin: 0 0 10px 0;
  justify-content: space-evenly;
  &__buttons {
    justify-content: space-evenly;
  }
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
.v-color-picker {
  max-width: 100% !important;
  &__swatches > div {
    justify-content: space-between !important;
    padding: 0 !important;
  }
}
</style>
