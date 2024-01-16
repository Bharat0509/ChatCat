/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    900: "#5735df",
                    800: "#5735dfe6",
                    700: "#5735dfcc",
                    600: "#5735dfb3",
                    500: "#5735df80",
                    400: "#5735df66",
                    300: "#5735df4d",
                    200: "#5735df33",
                },
                secondary: "#ff6f00",
                background: "#f8f8f8",
                textDark: "#333333",
                textLight: "#ffffff",
                buttonHighlight: "#4a289e",
                border: "#bcbcbc",
                accent: "#00bcd4",
            },
        },
    },
    plugins: [
        require("@tailwindcss/forms")({
            strategy: "class",
        }),
    ],
};
