# Creación de la aplicación cliente de reportes

## Creación del proyecto

```bash
npm create vite@latest
# cd <project>
npm install lucide-react
npm install axios
```

## Limpieza del proyecto

- Eliminamos al fichero App.css 
- Vaciamos el fichero App.tsx de su contenido

```tsx
import './App.css'

function App() {
(
    <>
    </>
  )
}

export default App
```

Añadimos las siguientes clases al fichero index.css

```css
#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.react:hover {
  filter: drop-shadow(0 0 2em #61dafbaa);
}

@keyframes logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: no-preference) {
  a:nth-of-type(2) .logo {
    animation: logo-spin infinite 20s linear;
  }
}

.card {
  padding: 2em;
}

.read-the-docs {
  color: #888;
}

```

## Añadimos la estructura de la página

```tsx
import { Aside } from './components/Aside';
import { Main } from './components/Main';

function App() {
  return (
    <div className="app-layout">
      <Aside />
      <Main />
    </div >
  )
}

export default App;
```

### Aside Component

Creamos el componente Aside

```tsx
iimport { FileText, Loader2, ChevronRight } from 'lucide-react'

export const Aside = () => {
  return (
    <aside className="sidebar glass">
      <div className="sidebar-header">
        <div className="app-logo">
          <FileText className="text-primary" />
          <span>JasperReports </span>
        </div>
        {/* */}
      </div>
      <div className="sidebar-content">
        <h3>Reportes Disponibles</h3>
        <div className="loading-state">
          <Loader2 className="animate-spin" />
          <p>Cargando lista...</p>
        </div>
        <ul className="report-list">
          <li>
            <div className="report-info">
              <span className="report-label">Label</span>
              <span className="report-path">Url</span>
            </div>
            <ChevronRight size={16} className="chevron" />
          </li>
          <li>
            <div className="report-info">
              <span className="report-label">Label</span>
              <span className="report-path">Url</span>
            </div>
            <ChevronRight size={16} className="chevron" />
          </li>
        </ul>
      </div>
    </aside >
  )
}

```

### Main

Creamos el componente Main

```tsx
import { Play, FileText } from "lucide-react";

export const Main = () => {
  return (
    <main className="main-content">
      <header className="main-header glass">
        <div>
          <h2>Selecciona un reporte</h2>
        </div>
        <div className="actions">
          <button className="btn-secondary">
            <Play size={16} /> Re-ejecutar
          </button>
        </div>
      </header>

      <section className="report-view">
        <div className="empty-state">
          <FileText size={64} className="text-muted" strokeWidth={1} />
          <h3>Vista Previa del Reporte</h3>
          <p>Selecciona un reporte de la lista de la izquierda para visualizarlo.</p>
        </div>
      </section>
    </main>
  )
}
```

## Creación hook JasperReport

Creamos un hook llamdo useReports, que nos servirá para acceder a la lista de reportes del servidor Jasper Report Server

```tsx
import axios from 'axios';

interface Reports {
  version:        number;
  permissionMask: number;
  creationDate:   Date;
  updateDate:     Date;
  label:          string;
  description:    string;
  uri:            string;
  resourceType:   string;
}

/**
 * Axios instance to make requests to the JasperReports server
 */
const httpClient = axios.create({
  // En desarrollo, Vite proxy maneja las peticiones a /jasperserver
  // En producción, puedes configurar baseURL si es necesario
  baseURL: import.meta.env.DEV ? '/jasperserver/rest_v2' : import.meta.env.VITE_BASE_URL,
  headers: {
    /* 
     * Codifica las credenciales en Base64 para enviarlas en el header Authorization
     * btoa(`admin:admin`)
     */
    Authorization: `Basic ${btoa(`admin:admin`)}`,
  }
});

export const useReports = () => {

  /**
   * Login to the JasperReports server
   * Only use to check if the server is available
   * @returns True if the login is successful, false otherwise
   */
  const login = async () => {
    try {
      const response = await httpClient.get(`/serverInfo`);
      return response.status === 200;
    } catch (error: any) {
      if (error.code === 'ERR_NETWORK' || error.message?.includes('ERR_CONNECTION_REFUSED')) {
        console.error('Error de conexión: El servidor JasperReports no está disponible en http://localhost:8080');
      } else {
        console.error('Error en login:', error.message);
      }
      return false;
    }
  }

  /**
   * Get the list of reports from the JasperReports server
   * @returns List of reports
   */
  const getReports = async (): Promise<Reports[]> => {
    return (await httpClient.get('/resources?type=reportUnit&recursive=true', {
      headers: {
        Accept: 'application/json',
      },
    })).data.resourceLookup;
  }


  const getReportExecution = async (reportPath: string, format = 'pdf') => {
    const response = await axios.get(`/reports${reportPath}.${format}`, {
        responseType: 'blob'
    });
    return URL.createObjectURL(response.data);
  }


  return {
    login: login,
    getReports: getReports,
    getReportExecution: getReportExecution
  }
}
```

## Carga de los reportes disponibles en el menú

Realizamos las modificacines necesarias para pasarle al menú la lista de reportes disponibles


```tsx
export const Aside = ({ reports }: { reports: Reports[] }) => {
  const [selectedReport, setSelectedReport] = useState<Reports | null>(null);

  const handleSelectReport = (report: Reports) => {
    setSelectedReport(report);
  }

  return (
    ...
        <h3>Reportes Disponibles</h3>

        {
          reports.length === 0 ? (
            <div className="loading-state">
              <Loader2 className="animate-spin" />
              <p>Cargando lista...</p>
            </div>
          ) : (
            <ul className="report-list">
              {
                /** List of reports */
                reports.map((report) => (
                  <li
                    key={report.uri}
                    className={selectedReport?.uri === report.uri ? 'active' : ''}
                    onClick={() => {
                      handleSelectReport(report);
                    }}
                  >
                    <div className="report-info">
                      <span className="report-label">{report.label}</span>
                      <span className="report-path">{report.uri}</span>
                    </div>
                    <ChevronRight size={16} className="chevron" />
                  </li>
                ))
              }
    ...

    </aside >
  )
}
```

## Activación del reporte


