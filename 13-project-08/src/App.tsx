import { useEffect, useState } from 'react';
import { Aside } from './components/Aside';
import { Main } from './components/Main';
import { useReports } from './hooks/useReports';
import Swal from 'sweetalert2';

/**
 * Main application component for listing and executing JasperReports.
 * @returns Root layout with sidebar and report preview panel.
 */
function App() {
  const { getReports, getReportExecution, getReportInputControls } = useReports();
  const [reports, setReports] = useState<Report[]>([]);
  const [reportUrl, setReportUrl] = useState<string | null>(null);


  
  /**
   * Executes the selected report and sets the generated preview URL.
   * If the report has input controls, it requests parameter values using a modal.
   * @param report Selected report metadata.
   * @returns Promise resolved when report execution finishes.
   */
  const runReport = async (report: Report): Promise<void> => {
    try {
      /* 
        console.log(await getReportInputControls(report.uri))
        const blobUrl = await getReportExecution(report.uri, 'pdf', {
          "rating": "PG"
        });
      */
      const controls = await getReportInputControls(report.uri);
      const params: Record<string, any> = {};

      if (controls.length > 0) {
        const { value: formValues, isDismissed } = await Swal.fire({
          title: `Parámetros para ${report.label}`,
          html: controls.map((c: any) => `
            <div style="text-align: left; margin-bottom: 1rem;">
              <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">${c.label}</label>
              <input id="swal-input-${c.id}" class="swal2-input" style="margin: 0; width: 100%; box-sizing: border-box;" placeholder="${c.label}">
            </div>
          `).join(''),
          focusConfirm: false,
          showCancelButton: true,
          confirmButtonText: 'Ejecutar',
          cancelButtonText: 'Cancelar',
          preConfirm: () => {
            const values: Record<string, any> = {};
            controls.forEach((c: any) => {
              const input = document.getElementById(`swal-input-${c.id}`) as HTMLInputElement;
              values[c.id] = input.value;
            });
            return values;
          }
        });

        if (isDismissed || !formValues) return;
        Object.assign(params, formValues);
      }

      const blobUrl = await getReportExecution(report.uri, 'pdf', params);
      setReportUrl(blobUrl);
    } catch (error) {
      console.error('Error running report:', error);
    }
  };

  useEffect(() => {
    getReports().then((response) => {
      setReports(response ?? []);
    });
  }, []);

  return (
    <div className="app-layout">
      <Aside reports={reports} onSelectReport={runReport} />
      <Main reportUrl={reportUrl} />
    </div >
  )
}

export default App;
