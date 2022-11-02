// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  meta: {
    title: "Pokédex",
    link: [
      {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap",
      },
    ],
  },

  buildModules: ["@nuxtjs/tailwindcss"], 

  imports: {
    dirs: ["store"],
  },

  modules: [
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "acceptHMRUpdate"],
      },
    ],
  ],

  typescript: {
    shim: false,
    strict: true,
  },

  tailwindcss: {
    viewer: false,
  },
});
