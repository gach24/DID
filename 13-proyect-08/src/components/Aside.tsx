import { FileText, Loader2, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export const Aside = ({ reports, onSelectReport }: { reports: Report[], onSelectReport: (report: Report) => void }) => {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const handleSelectReport = (report: Report) => {
    setSelectedReport(report);
    onSelectReport(report);
  }

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
            </ul>
          )
        }
      </div>

    </aside >
  )
}
