/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                backgroundShadow: '#2e2a4273',
                primaryColor: '#000861e8',
                backgroundColor: '#ebebf0',
            },
            fontFamily: {
                mont: ['Montserrat', 'sans-serif'],
                poppins: ['Poppins', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
