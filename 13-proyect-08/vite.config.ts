import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/jasperserver': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        configure: (proxy, _options) => {
          proxy.on('proxyRes', (proxyRes, _req, _res) => {
            if (proxyRes.headers['www-authenticate']) {
              delete proxyRes.headers['www-authenticate'];
            }
          });
        }
      }
    }
  }
})
