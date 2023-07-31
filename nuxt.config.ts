// https://nuxt.com/docs/api/configuration/nuxt-config

// @ts-nocheck

import {faviconLinks} from './helpers/favicon';

export default defineNuxtConfig({
    router: {
        trailingSlash: true
    },
    app: {
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            titleTemplate: '%s - Магазин цифровых ключей',
            link: [
                ...faviconLinks(),
                {
                    rel: 'preconnect',
                    href: 'https://fonts.googleapis.com'
                },
                {
                    rel: 'preconnect',
                    href: 'https://fonts.gstatic.com',
                    crossorigin: true
                },
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css2?family=Overpass:wght@400;700&display=swap'
                },
            ],
            meta: [
                {
                    name: 'yandex-verification',
                    content: '499b3cbff2687c7b'
                },
                {
                    name: 'msapplication-TileColor',
                    content: '#ffffff'
                },
                {
                    name: 'msapplication-TileImage',
                    content: '/ms-icon-144x144.png'
                },
                {
                    name: 'theme-color',
                    content: '#ffffff'
                }
            ],
            script: [
                {
                    src: 'https://code.jivo.ru/widget/8zZVWp2rVE',
                    async: true,
                    tagPosition: 'head',
                },
                {
                    innerHTML: '   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};\n' +
                        '   m[i].l=1*new Date();\n' +
                        '   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}\n' +
                        '   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})\n' +
                        '   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");\n' +
                        '\n' +
                        '   ym(' + process.env.YANDEX_METRIKA_COUNTER_ID + ', "init", {\n' +
                        '        clickmap:true,\n' +
                        '        trackLinks:true,\n' +
                        '        accurateTrackBounce:true,\n' +
                        '        webvisor:true,\n' +
                        '        ecommerce:"dataLayer"\n' +
                        '   });\n'
                }
            ],
            noscript: [
                {
                    innerHTML: '<div><img src="https://mc.yandex.ru/watch/' + process.env.YANDEX_METRIKA_COUNTER_ID + '" style="position:absolute; left:-9999px;" alt="" /></div>'
                }
            ]
        }
    },
    runtimeConfig: {
        public: {
            backendUrl: process.env.BACKEND_URL || '',
            paymentReceiverAccountNumber: process.env.PAYMENT_RECEIVER_ACCOUNT_NUMBER,
            paymentFormUrl: process.env.PAYMENT_FORM_URL,
            baseUrl: process.env.BASE_URL
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
        'nuxt-simple-sitemap',
        '@nuxtjs/device',
        '@nuxtjs/robots'
    ],
    device: {
        refreshOnResize: true
    },
    robots: {
        rules: {
            UserAgent: '*',
            Allow: '/',
            Disallow: ['/*?*', '/order/*'],
            Host: process.env.BASE_URL,
            Sitemap: process.env.BASE_URL + 'sitemap.xml'
        } as {}
    },
    sitemap: {
        inferStaticPagesAsRoutes: false,
        siteUrl: process.env.BASE_URL,
    },
    vue: {
        compilerOptions: {
            isCustomElement: (tag) => ['lottie-player'].includes(tag),
        },
    }
})
