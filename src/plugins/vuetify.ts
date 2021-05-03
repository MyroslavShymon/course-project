import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: false,
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
      },
      dark: {
        primary: "#0d6700",
        secondary: "#790009",
        accent: "#3B0453",
        error: "#FF5252",
        info: "#00322D",
        success: "#140C56",
        warning: "#7D2E00",
      },
    },
  },
});
