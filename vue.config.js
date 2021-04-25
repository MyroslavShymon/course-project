module.exports = {
  lintOnSave: false,
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/styles/index.scss";`,
      },
    },
  },
};
