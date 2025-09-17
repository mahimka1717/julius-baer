import { defineConfig } from "vite";
import { resolve } from "path";
import handlebars from 'vite-plugin-handlebars';
import path from 'path';
import fs from 'fs';

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
      input: Object.fromEntries(
        fs.readdirSync(__dirname)
          .filter(file => file.endsWith('.html'))
          .map(file => [ path.basename(file, '.html'), path.resolve(__dirname, file) ])
      )
    }
  },
  plugins: [
    handlebars({
      partialDirectory: [
        resolve(__dirname, 'src/hbs'),
        resolve(__dirname, 'src/hbs/head'),
        resolve(__dirname, 'src/hbs/components')
      ],
    })
  ],
});
