/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./nuxt.config.{js,ts}",
        "./app.vue"
    ],
    theme: {
        container: {
            screens: {
                'sm': '100%',
                'md': '100%',
                'lg': '768px',
                'xl': '1024px',
                '2xl': '1024px',
            }
        },
        extend: {},
    },
    plugins: [],
}
