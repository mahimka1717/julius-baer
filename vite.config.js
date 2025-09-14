import { defineConfig } from "vite";
import { resolve } from "path";
import handlebars from 'vite-plugin-handlebars';
import path from 'path';

export default defineConfig({
  css: {
    preprocessorOptions: {
      sass: {
        // Настройки SASS препроцессора
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
        "the-4-gen-family-board": path.resolve(__dirname, 'the-4-gen-family-board.html'),
        "the-purpose-divergence": path.resolve(__dirname, 'the-purpose-divergence.html'),
        "second-legacy": path.resolve(__dirname, 'second-legacy.html'),
        "all-that-passion-and-all-that-jazz": path.resolve(__dirname, 'all-that-passion-and-all-that-jazz.html'),
        index: path.resolve(__dirname, 'index.html'),
      }
    }
  },
  plugins: [
    handlebars({
      partialDirectory: [
        resolve(__dirname, 'src/hbs'),
        resolve(__dirname, 'src/hbs/partials')
      ],
    })
  ],
});
