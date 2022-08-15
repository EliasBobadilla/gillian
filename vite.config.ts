import react from '@vitejs/plugin-react'
// import { env } from 'node:process'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
  ],
  // base: env.IS_GITHUB ? 'gillian' : undefined,
})
