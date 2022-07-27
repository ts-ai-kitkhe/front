export default {
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'front',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/scss/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~plugins/draggable.js',
    '~plugins/draggable-resizable.js',
    '~plugins/easy-lightbox.js',
    '~plugins/progress.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    '@nuxtjs/style-resources',
  ],
  styleResources: {
    scss: ['./assets/scss/_breakpoints.scss', './assets/scss/_variables.scss'],
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
  ],

  auth: {
    redirect: {
      login: '/admin/login',
      logout: '/admin/login',
      callback: '/callback',
      home: '/admin/books',
    },
    strategies: {
      cognito: {
        scheme: '@a1ter/nuxt-auth-aws-cognito-scheme/scheme/scheme',
        credentials: {
          userPoolId: process.env.COGNITO_USERPOOL_ID,
          userPoolWebClientId: process.env.COGNITO_CLIENT_ID,
          region: process.env.COGNITO_REGION,
        },
        endpoints: {
          user: false,
        },
      },
    },
  },

  bootstrapVue: {
    icons: true,
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['@nuxtjs/auth-next'],
    babel: {
      compact: true,
    },
  },
}
