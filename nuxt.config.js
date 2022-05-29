import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - shopping-cart-generator',
    title: 'shopping-cart-generator',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
      {name: 'format-detection', content: 'telephone=no'}
    ],
    link: [{rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: '~/plugins/vue-good-table', mode: 'client'},
    { src: '~/plugins/netlify-identity-widget.js', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@aceforth/nuxt-netlify'
  ],
  netlify: {
    redirects: [
      {
        from : "/step-one",
        to : "/step-one",
        status : 200,
        conditions : {Role : "sub"}
      },
      {
        from : "/product-entry",
        to : "/product-entry",
        status : 200,
        conditions : {Role : "sub"}
      },
      {
        from : "/step-one",
        to : "/",
        status : 403,
      },
      {
        from : "/product-entry",
        to : "/",
        status : 403,
      }
    ]
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/proxy',
    '@nuxtjs/axios'
  ],
  middleware: [''],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          white: "#FFFFFF"
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  axios: {
    credentials: false,
    debug: true,
    proxy: true
  },
  proxy: {
      '/api': {'target':'https://cardpointedemoaj.securepayments.cardpointe.com/pay?', pathRewrite: { "^/api/": ""}}
  }
}
