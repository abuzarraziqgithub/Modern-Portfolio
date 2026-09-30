// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  compressHTML: true,
  build: {
    inlineStylesheets: 'always',
  },
  image: {
    responsiveStyles: true,
  },
  vite: {
    build: {
      cssMinify: 'lightningcss',
    },
  },
});
