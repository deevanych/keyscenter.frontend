// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
// @ts-ignore
    runtimeConfig: {
        public: {
            backendUrl: process.env.BACKEND_URL || '',
            paymentReceiverAccountNumber: process.env.PAYMENT_RECEIVER_ACCOUNT_NUMBER,
            paymentFormUrl: process.env.PAYMENT_FORM_URL
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
        '@pinia/nuxt',
        '@pinia-plugin-persistedstate/nuxt',
        '@nuxtjs/robots'
    ],
    robots: {
        rules: {
                UserAgent: '*',
                Disallow: '/'
            }
    }
})
