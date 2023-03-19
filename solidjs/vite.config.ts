import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import postcssNesting  from 'postcss-nesting'

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
  css: {
    postcss: {
      plugins: [
        postcssNesting
      ]
    }
  }
});
