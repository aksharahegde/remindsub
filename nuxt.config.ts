// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "nuxt-auth-utils", "@nuxthub/core"],
  compatibilityDate: "2024-09-22",
  hub: {
    database: true,
  },
});
