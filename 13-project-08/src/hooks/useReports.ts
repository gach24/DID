import axios from 'axios';

/**
 * Axios instance to make requests to the JasperReports server
 */
const httpClient = axios.create({
  // En desarrollo, Vite proxy maneja las peticiones a /jasperserver
  // En producción, puedes configurar baseURL si es necesario
  // baseURL: import.meta.env.DEV ? '/jasperserver/rest_v2' : import.meta.env.VITE_BASE_URL,
  baseURL: '/jasperserver/rest_v2',
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
  const login = async (): Promise<boolean> => {
    try {
      const response = await httpClient.get(`/serverInfo`);
      return response.status === 200;
    } catch (error: any) {
      if (error.code === 'ERR_NETWORK' || error.message?.includes('ERR_CONNECTION_REFUSED')) {
        console.error('Error de conexión: El servidor JasperReports no está disponible a través del proxy');
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


  /**
   * Execute a report and get the blob URL
   * @param reportPath Path to the report
   * @param format Output format (pdf, html, xls, etc.)
   * @param params Report parameters
   * @returns Blob URL of the executed report
   */
  const getReportExecution = async (
    reportPath: string,
    format = 'pdf',
    params?: Record<string, any>
  ): Promise<string> => {
    const response = await httpClient.get(`/reports${reportPath}.${format}`, {
      responseType: 'blob',
      params: params
    });

    return URL.createObjectURL(response.data);
  }


  /**
   * Get the list of input controls for a report
   * @param reportPath Path to the report
   * @returns List of input controls
   */
  const getReportInputControls = async (reportPath: string): Promise<any[]> => {
    try {
      const response = await httpClient.get(`/reports${reportPath}/inputControls`, {
        headers: {
          Accept: 'application/json',
        },
      });
      // The response usually contains an array of input controls in response.data.inputControl
      return response.data.inputControl || [];
    } catch (error) {
      console.error('Error fetching input controls:', error);
      return [];
    }
  }


  return {
    login: login,
    getReports: getReports,
    getReportExecution: getReportExecution,
    getReportInputControls: getReportInputControls
  }
}
