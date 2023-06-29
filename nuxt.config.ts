// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  routeRules: {
    "/**": { prerender: true },
  },
  experimental: {
    renderJsonPayloads: false,
  },
  modules: [
    // ...
    "@pinia/nuxt",
  ],
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      "defineStore", // import { defineStore } from 'pinia'
      ["defineStore", "definePiniaStore"], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },
  build: {
    transpile: ["@vuepic/vue-datepicker"],
  },
  css: ["~/assets/css/main.scss"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      debug: true,
      baseURL: "https://api.mahmoudzadehjewellery.com/v1",
    },
  },
  devtools: { enabled: true },
});
