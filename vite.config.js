import reactRefresh from '@vitejs/plugin-react-refresh';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [reactRefresh()],
  optimizeDeps: {
    include: ['antd', 'react', 'react-dom','@ant-design/icons']
  },
  server: {
    open: 'src/demo/index.html',
    port: '5193'
  },
  build: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
    rollupOptions: {
      input: {
        main: 'src/demo/index.html'
      },
      exclude: ['demo/**']
    }
  },
})