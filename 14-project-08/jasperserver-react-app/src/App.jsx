import React, { useState, useEffect } from 'react';
import { LogIn, FileText, ChevronRight, LogOut, Loader2, Play } from 'lucide-react';
import JasperService from './services/JasperService';
import './App.css';

function App() {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [reportUrl, setReportUrl] = useState('');

  // Auto-login with default credentials if not already "logged in"
  useEffect(() => {
    const autoLogin = async () => {
      try {
        setLoading(true);
        // Force basic auth in local storage for JasperService
        const auth = btoa('admin:admin');
        localStorage.setItem('jasper_auth', auth);
        await loadReports();
      } catch (err) {
        setError('Error al conectar con JasperReports');
      } finally {
        setLoading(false);
      }
    };

    autoLogin();
  }, []);

  const loadReports = async () => {
    try {
      setLoading(true);
      const data = await JasperService.getReports();
      setReports(data);
    } catch (err) {
      setError('Error al cargar reportes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    // Logout functionality removed or simplified
    console.log('Logout disabled');
  };

  const runReport = async (report) => {
    setSelectedReport(report);
    setLoading(true);
    try {
      // Clean path: remove the initial '/' if present
      const cleanPath = report.uri.startsWith('/') ? report.uri.substring(1) : report.uri;
      // For simplicity in this demo, we use a blob-based PDF viewer
      const blobUrl = await JasperService.getReportExecution(report.uri, 'pdf');
      setReportUrl(blobUrl);
    } catch (err) {
      console.error(err);
      setError(`Error al ejecutar reporte: ${err.message || 'Error desconocido'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-layout">
      <aside className="sidebar glass">
        <div className="sidebar-header">
          <div className="app-logo">
            <FileText className="text-primary" />
            <span>JasperReports </span>
          </div>
          {loading && <Loader2 className="animate-spin text-muted" size={20} />}
        </div>

        <div className="sidebar-content">
          <h3>Reportes Disponibles</h3>
          {loading && reports.length === 0 ? (
            <div className="loading-state">
              <Loader2 className="animate-spin" />
              <p>Cargando lista...</p>
            </div>
          ) : (
            <ul className="report-list">
              {reports?.map((report) => (
                <li
                  key={report.uri}
                  className={selectedReport?.uri === report.uri ? 'active' : ''}
                  onClick={() => runReport(report)}
                >
                  <div className="report-info">
                    <span className="report-label">{report.label}</span>
                    <span className="report-path">{report.uri}</span>
                  </div>
                  <ChevronRight size={16} className="chevron" />
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>

      <main className="main-content">
        <header className="main-header glass">
          <div>
            <h2>{selectedReport ? selectedReport.label : 'Selecciona un reporte'}</h2>
            {selectedReport && <p className="text-muted">{selectedReport.uri}</p>}
          </div>
          <div className="actions">
            {selectedReport && (
              <button className="btn-secondary" onClick={() => runReport(selectedReport)}>
                <Play size={16} /> Re-ejecutar
              </button>
            )}
          </div>
        </header>

        <section className="report-view">
          {loading && <div className="report-loading"><Loader2 className="animate-spin" size={48} /></div>}

          {reportUrl ? (
            <iframe
              src={reportUrl}
              title="Report Viewer"
              className="report-iframe"
            />
          ) : (
            <div className="empty-state">
              <FileText size={64} className="text-muted" strokeWidth={1} />
              <h3>Vista Previa del Reporte</h3>
              <p>Selecciona un reporte de la lista de la izquierda para visualizarlo.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
