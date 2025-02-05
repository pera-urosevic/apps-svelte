import path from 'node:path'
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  root: './src',
  envDir: '../',
  build: {
    rollupOptions: {
      input: {
        // home
        'index': '/index.html',
        // brew
        'brew': '/brew.html',
        'brew-edit': '/brew-edit.html',
        // colors
        'colors': '/colors.html',
        'colors-picker': '/colors-picker.html',
        // database
        'database': '/database-index.html',
        'database-collection': '/database-collection.html',
        'database-doc': '/database-doc.html',
        // monitor
        'monitor': '/monitor.html',
        // reader
        'reader': '/reader.html',
        'reader-edit': '/reader-edit.html',
        // seeker
        'seeker': '/seeker.html',
        // subtler
        'subtler': '/subtler.html',
        'subtler-video': '/subtler-video.html',
        // tvshows
        'tvshows': '/tvshows.html',
        'tvshows-create': '/tvshows-create.html',
        'tvshows-details': '/tvshows-details.html',
        'tvshows-refresh': '/tvshows-refresh.html',
        'tvshows-watch': '/tvshows-watch.html',
      },
      output: {
        dir: './dist',
      },
    }
  },
  resolve: {
    alias: {
      '~external': path.resolve(__dirname, './src/~external'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@services': path.resolve(__dirname, './src/services'),
    },
  }
})
