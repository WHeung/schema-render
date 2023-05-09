import reactRefresh from '@vitejs/plugin-react-refresh';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [reactRefresh()],
  build: {
    rollupOptions: {
      input: 'src/index.tsx'
    }
  },
  optimizeDeps: {
    include: ['antd', 'react', 'react-dom']
  },
})