/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx,css,md,mdx,html,json,scss}',
    ],
    darkMode: 'class',
    theme: {
        colors : {
            primary: "#565a75",
            secondary: "#fafbf6",
            accent: "#0f0f1b",
            active: "#c6b7be",
        },
        extend: {

        },
    },
    plugins: [],
};
