// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: [
      '~/assets/scss/main.scss'
    ],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    modules: [
        '@nuxtjs/apollo',
        '@pinia/nuxt',
        '@pinia-plugin-persistedstate/nuxt'
    ],
    apollo: {
        clients: {
            default: {
                httpEndpoint: process.env.GRAPHQL_ENDPOINT ?? "http://localhost:1337/graphql"
            }
        },
    },
})
