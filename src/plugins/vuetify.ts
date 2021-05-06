import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
// import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

// const globalColorsLight={

// }

export default new Vuetify({
  theme: {
    dark: true,
    default: "light",
    themes: {
      light: {
        primary: "#a279ff",
        secondary: "#ffe969",
        accent: "#4E27A6",
        error: "#A6226D",
        info: "#D96FFF",
        success: "#22A622",
        warning: "#FF6400",
        default_0: "#ffffff",
        default_1: "#a5a5a5",
        default_2: "#b8b8b8",
        default_3: "#cecece",
        default_4: "#e0e0e0",
        default_5: "#f3f3f3",
      },
      dark: {
        primary: "#a279ff",
        secondary: "#ffe969",
        accent: "#3B0453",
        error: "#FF5252",
        info: "#00322D",
        success: "#140C56",
        warning: "#7D2E00",
        default_0: "#1E1E1E",
        default_1: "#0a0a0a",
        default_2: "#1d1d1d",
        default_3: "#2b2b2b",
        default_4: "#4e4e4e",
        default_5: "#7c7c7c",
      },
    },
  },
});
