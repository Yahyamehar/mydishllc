import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  devtools: { enabled: true },

  css: [
    '@/assets/css/bootstraps.min.css',
    '@/assets/css/global.css',
    '@/assets/css/all.min.css',
    '@/assets/css/animate.css',
    '@/assets/css/slick.css',
    '@/assets/css/style.css',
    '@/assets/css/custom-select.css',
    '@/assets/css/slick-theme.css',
    '@/assets/css/swiper.min.css',
  ],

  build: {
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        if (config.module) {
          config.devtool = 'source-map';
        }
      }
    },
  },

  // Add the @nuxt/http module configuration
  http: {
    baseURL: 'http://localhost:5000', // Replace with your backend server URL
  },

  store: true,
});
