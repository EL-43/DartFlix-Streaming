// packages/client/tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#e50914",
                "primary-light": "#ff6b35",
                "dark-900": "#0f0f23",
                "dark-800": "#1a1a2e",
                "dark-700": "#0e0e0f",
            },
            animation: {
                "fade-in-up": "fadeInUp 0.8s ease-out",
                "slide-in": "slideIn 0.5s ease-out",
                "spin-slow": "spin 1s linear infinite",
            },
            keyframes: {
                fadeInUp: {
                    "0%": { opacity: "0", transform: "translateY(30px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                slideIn: {
                    "0%": { transform: "translateX(-100%)" },
                    "100%": { transform: "translateX(0)" },
                },
            },
            backgroundImage: {
                "gradient-primary": "linear-gradient(45deg, #e50914, #ff6b35)",
                "gradient-dark":
                    "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #0e0e0f 100%)",
            },
        },
    },
    plugins: [],
};
