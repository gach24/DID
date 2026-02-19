import { useEffect, useState } from 'react';
import { Aside } from './components/Aside';
import { Main } from './components/Main';
import { useReports } from './hooks/useReports';

function App() {
  const { getReports, getReportExecution } = useReports();
  const [reports, setReports] = useState<Report[]>([]);
  const [reportUrl, setReportUrl] = useState<string | null>(null);


  const runReport = async (report: Report) => {
    try {
      console.log('Executing report:', report.uri);
      // const cleanPath = report.uri.startsWith('/') ? report.uri.substring(1) : report.uri;
      const blobUrl = await getReportExecution(report.uri, 'pdf');
      console.log('Report URL created:', blobUrl);

      setReportUrl(blobUrl);
    } catch (error) {
      console.error('Error running report:', error);
    }
  };

  useEffect(() => {
    getReports().then((response) => {
      setReports(response);
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
