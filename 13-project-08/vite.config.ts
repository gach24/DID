import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  /*
   * Con esto, las peticiones a /jasperserver/rest_v2/serverInfo se redirigen a través del proxy de Vite hacia http://10.0.255.100:8080, evitando el error de CORS porque el navegador ve la petición como si viniera del mismo origen (el servidor de desarrollo de Vite).
   * El proxy solo funciona en desarrollo. En producción, asegúrate de que el servidor permita CORS o configura un proxy similar en tu servidor web (nginx, Apache, etc.).
  */
  server: {
    proxy: {
      '/jasperserver': {
        target: 'http://10.0.255.100:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
