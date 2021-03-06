const webpack = require('webpack')

module.exports = {

  /*
  ** Headers of the page
  */
  head: {
    title: 'mybest',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    script: [
      { src: "http://localhost:8098" }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  plugins: ['~plugins/vuetify'],


  /*
  ** Customize the progress bar color
  */
  loading: {
    color: 'blue',
    height: '5px'
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      config.devtool = "eval-source-map"
    }
  },
  // router: {
  //   middleware: 'authenticated'
  // }
  serverMiddleware: [
    '~/apies/index.js'
  ]
}
