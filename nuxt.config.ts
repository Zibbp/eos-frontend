import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            apiURL: '',
            cdnURL: ''
        }
    },
    buildModules: [
        '@nuxtjs/google-fonts',
        '@nuxtjs/tailwindcss',
        '@pinia/nuxt'
    ],
    modules: [
        '@nuxtjs/color-mode',
        'dayjs'
    ],
    colorMode: {
        classSuffix: ""
    },
    components: {
        dirs: [
            `~/components`
        ]
    },
    css: [
        'assets/css/main.css',
        'primevue/resources/themes/lara-light-blue/theme.css',
        'primevue/resources/primevue.css',
        'primeicons/primeicons.css',
        'plyr/dist/plyr.css'
    ],
    build: {
        transpile: ['primevue']
    },
    googleFonts: {
        downloaded: true,
        families: {
            Inter: true
        }
    },
})
