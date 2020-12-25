module.exports = {
  // publicPath: "/",
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "My Movies";
      return args;
    });
  },
  //   devServer: {
  //     proxy: {
  //       '^/api/movie': {
  //         target: 'https://hw-web-api.herokuapp.com/api/movie',
  //         pathRewrite: { "^/api/movie": "" },
  //         ws: true,
  //         logLevel: "debug",
  //       }
  //   }
  // }
};
