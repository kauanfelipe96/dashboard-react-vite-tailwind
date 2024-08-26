/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,ts,tsx,jsx}"],
    theme: {
        screens: {
            sm: "1024px",
            md: "1980px",
            lg: "2500px",
            xl: "3800px",
        },
        extend: {
            colors: {
                card: "rgba(255, 255, 255, 0.02)",
                "card-border": "rgba(255, 255, 255, 0.1)",
                pink: "#FF194C",
                dark: "rgba(0,0,0,0.5)",
                bankCard: "rgba(255, 255, 255, 0.03)",
            },
            dropShadow: {
                red: "0 0 0.3rem crimson",
            },
            transitionProperty: {
                filter: "filter",
                background: "background",
            },
        },
    },
    plugins: [],
};
