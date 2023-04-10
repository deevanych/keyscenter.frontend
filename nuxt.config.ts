// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            backendUrl: process.env.BACKEND_URL || ''
        }
    },
    hooks: {
        ready: () => {
            if (process && typeof process.send !== 'undefined') {
                process.send('ready')
            }
        }
    },
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
                httpEndpoint: process.env.GRAPHQL_ENDPOINT ?? process.env.BACKEND_URL + 'graphql'
            }
        },
    },
})
