import axios from 'axios';

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
  const getReports = async (): Promise<Report[]> => {
    return (await httpClient.get('/resources?type=reportUnit&recursive=true', {
      headers: {
        Accept: 'application/json',
      },
    })).data.resourceLookup;
  }


  const getReportExecution = async (reportPath: string, format = 'pdf') => {
    try {
      // JasperServer REST API v2 - Report Executions method (POST)
      // This is the standard way to execute reports
      console.log('Executing report:', reportPath);
      console.log('Format:', format);
      
      // Step 1: Create report execution
      const executionResponse = await httpClient.post('/reportExecutions', {
        reportUnitUri: reportPath,
        async: false,
        outputFormat: format.toUpperCase(),
        interactive: false
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Execution created:', executionResponse.data);
      
      // Get execution ID
      const executionId = executionResponse.data.requestId || executionResponse.data.id;
      if (!executionId) {
        console.error('No execution ID found in response:', executionResponse.data);
        throw new Error('No execution ID returned from server');
      }
      
      console.log('Execution ID:', executionId);
      
      // Step 2: Get the export (usually the first one)
      const exports = executionResponse.data.exports || executionResponse.data.export;
      const exportId = exports?.[0]?.id || exports?.id || '1';
      
      console.log('Export ID:', exportId);
      
      // Step 3: Get the output resource
      const outputResponse = await httpClient.get(`/reportExecutions/${executionId}/exports/${exportId}/outputResource`, {
        responseType: 'blob',
        headers: {
          Accept: `application/${format}`
        }
      });
      
      console.log('Output received - Status:', outputResponse.status);
      console.log('Output type:', outputResponse.data?.type);
      console.log('Output size:', outputResponse.data?.size);
      
      // Check if we got HTML error page instead of PDF
      if (outputResponse.data.type && outputResponse.data.type.includes('text/html')) {
        const reader = new FileReader();
        reader.onload = () => {
          console.error('Server returned HTML error:', reader.result?.toString().substring(0, 500));
        };
        reader.readAsText(outputResponse.data);
        throw new Error('Server returned HTML error page instead of PDF');
      }
      
      if (!outputResponse.data || outputResponse.data.size === 0) {
        throw new Error('Empty response from server');
      }
      
      // Create blob with correct MIME type
      const blob = new Blob([outputResponse.data], { 
        type: format === 'pdf' ? 'application/pdf' : `application/${format}` 
      });
      const blobUrl = URL.createObjectURL(blob);
      
      console.log('Blob URL created:', blobUrl);
      return blobUrl;
      
    } catch (error: any) {
      console.error('Error executing report:', error.message);
      if (error.response) {
        console.error('Status:', error.response.status);
        console.error('Status text:', error.response.statusText);
        console.error('Response data:', error.response.data);
        
        // Try to read error response if it's a blob
        if (error.response.data instanceof Blob) {
          const reader = new FileReader();
          reader.onload = () => {
            console.error('Error response content:', reader.result?.toString().substring(0, 500));
          };
          reader.readAsText(error.response.data);
        }
      }
      throw error;
    }
  }


  return {
    login: login,
    getReports: getReports,
    getReportExecution: getReportExecution
  }
}
