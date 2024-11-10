import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

// import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'

// import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver,NaiveUiResolver,Vuetify3Resolver } from 'unplugin-vue-components/resolvers'
import VueRouter from 'unplugin-vue-router/vite'
import Pages from 'vite-plugin-pages';
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [    
    VueRouter(),
    Pages({
      dirs: 'src/pages', 
      exclude: ['**/components/*.vue']
    }),
    Vue(),
    VueJsx(),
    AutoImport({
      resolvers: [ElementPlusResolver(),NaiveUiResolver(),Vuetify3Resolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver(),NaiveUiResolver(),Vuetify3Resolver()],
    }),
    react()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
