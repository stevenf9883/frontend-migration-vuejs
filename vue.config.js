module.exports = {
    chainWebpack: config => {
      config
        .plugin('html')
        .tap(args => {
          args[0].title= 'My Movies'
          return args
        })
    },
    devServer: {
      proxy: {
        '^/movie': {
          target: 'https://hw-web-api.herokuapp.com/api/movie',
          pathRewrite: { "^/movie": "/" },
          logLevel: "debug",
        }
    }
  }
}
