import { Play, FileText } from "lucide-react";

export const Main = ({ reportUrl }: { reportUrl: any }  ) => {
  console.log(reportUrl);
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
      {
        /*
        If the reportUrl is not null, show the iframe with the report
        If the reportUrl is null, show the empty state
        */
        reportUrl ? (
            <iframe
              src={reportUrl}
              title="Report Viewer"
              className="report-iframe"
              style={{ width: '100%', height: '100%', border: 'none' }}
              onError={(e) => {
                console.error('Iframe error:', e);
              }}
              onLoad={() => {
                console.log('Iframe loaded successfully');
              }}
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
  )
}
