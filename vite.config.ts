// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import * as path from "path"
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
// export default defineConfig({
// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, ".")

  return {
    plugins: [react()],
    css: {
      postcss: {
        plugins: [tailwindcss(), autoprefixer()],
      },
    },
    resolve: {
    alias: [{
        find: "@",
        replacement: path.resolve(__dirname, "src"),
      }]
    },
    server: {
      port: env.VITE_PORT,
    },
  }
})

