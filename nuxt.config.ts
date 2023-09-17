import { resolve, dirname } from "node:path";
import { fileURLToPath } from "url";
import VueI18nVitePlugin from "@intlify/unplugin-vue-i18n/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: false },

    modules: [
        "nuxt-scheduler",
        "@nuxtjs/tailwindcss",
        "@vue-macros/nuxt",
        "@nuxtjs/fontaine",
        "@vueuse/nuxt",
        "magic-regexp/nuxt",
    ],

    build: {
        transpile: ["@heroicons/vue"],
    },

    css: ["~/assets/styles/main.css"],

    vite: {
        plugins: [
            VueI18nVitePlugin({
                include: [
                    resolve(
                        dirname(fileURLToPath(import.meta.url)),
                        "./locales/*.json",
                    ),
                ],
            }),
        ],
    },

    runtimeConfig: {
        jwtAccessSecret: process.env.JWT_ACCESS_TOKEN_SECRET ?? "",
        jwtRefreshSecret: process.env.JWT_REFRESH_TOKEN_SECRET ?? "",
        cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME ?? "",
        cloudinaryAPIKey: process.env.CLOUDINARY_API_KEY ?? "",
        cloudinaryAPISecret: process.env.CLOUDINARY_API_SECRET ?? "",
    },
});
