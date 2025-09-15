import { defineConfig } from "vite";
import { resolve } from "path";
import handlebars from 'vite-plugin-handlebars';
import path from 'path';

export default defineConfig({
  css: {
    preprocessorOptions: {
      sass: {
      },
    },
  },
  server: {
    host: true,
    port: 3000,
  },
  build: {
    rollupOptions: {
      input: {
        "all-that-passion-and-all-that-jazz": path.resolve(__dirname, 'all-that-passion-and-all-that-jazz.html'),
        "the-4-gen-family-board": path.resolve(__dirname, 'the-4-gen-family-board.html'),
        "second-legacy": path.resolve(__dirname, 'second-legacy.html'),
        index: path.resolve(__dirname, 'index.html'),
      }
    }
  },
  plugins: [
    handlebars({
      partialDirectory: [
        resolve(__dirname, 'src/hbs')
      ],
    })
  ],
});
