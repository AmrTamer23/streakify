import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxtjs/supabase",
    "@vueuse/nuxt",
  ],

  typescript: {
    strict: true,
    typeCheck: true,
  },

  //@ts-ignore
  supabase: {
    redirect: false,
  },

  //@ts-ignore
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },

  compatibilityDate: "2024-09-06",
  plugins: [
    {
      mode: "client",
      src: "~/plugins/vue3-heatmap.ts",
    },
  ],
});
