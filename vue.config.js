module.exports = {
  transpileDependencies: ["vuetify"],
  lintOnSave: false,
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/styles/index.scss";`,
      },
    },
  },
};
