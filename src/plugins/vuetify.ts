import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
// import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

// const globalColorsLight={

// }

export default new Vuetify({
  theme: {
    dark: Boolean(localStorage.themeColor),
    default: "light",
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: "#a279ff",
        secondary: "#ffe969",
        accent: "#3B0453",
        error: "#A6226D",
        info: "#D96FFF",
        success: "#22A622",
        warning: "#FF6400",
        first_structure_color: "#ffffff",
        second_structure_color: "#ffffff",
        third_structure_color: "#ffffff",
      },
      dark: {
        primary: "#a279ff",
        secondary: "#ffe969",
        accent: "#4E27A6",
        error: "#FF5252",
        info: "#00322D",
        success: "#140C56",
        warning: "#7D2E00",
        first_structure_color: "#272727",
        second_structure_color: "#363636",
        third_structure_color: "#1e1e1e",
      },
    },
  },
});
