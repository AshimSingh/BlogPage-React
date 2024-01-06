import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// https://vitejs.dev/config/
import ckeditor5 from '@ckeditor/vite-plugin-ckeditor5'
export default defineConfig({
    server: {
        // proxy: {
        //     '/api': {
        //         target: import.meta.env.VITE_SERVER_URL,
        //         changeOrigin: true,
        //         // rewrite: (path) => path.replace(/^\/api/, ''),
        //     },
        // },
    },
    // base: '/api/',
    plugins: [
        react(),
        ckeditor5({ theme: '@ckeditor/ckeditor5-theme-lark' }),
    ],
    optimizeDeps: {
        include: ['ckeditor5-custom-build'],
    },
    build: {
        commonjsOptions: {
            include: [/ckeditor5-custom-build/, /node_modules/],
        },
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            '@': '/resources/js',
        },
    },
})
