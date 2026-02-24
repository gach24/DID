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
      const blobUrl = await getReportExecution(report.uri, 'pdf');
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
