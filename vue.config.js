module.exports = {
  chainWebpack: (config) => {
    config.plugin("define").tap((args) => {
      args[0]["process.env.VUE_APP_URL"] = JSON.stringify(
        process.env.VUE_APP_URL
      );
      return args;
    });
  },
};
