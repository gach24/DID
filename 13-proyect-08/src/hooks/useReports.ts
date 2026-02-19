import axios from 'axios';

const BASE_URL = '/jasperserver/rest_v2';
/**
 * Axios instance to make requests to the JasperReports server
 */
const httpClient = axios.create({
  withCredentials: true,
  headers: {
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
      const response = await httpClient.get(`${BASE_URL}/serverInfo`);
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
    const response = await httpClient.get(`${BASE_URL}/resources?type=reportUnit&recursive=true`, {
      headers: {
        Accept: 'application/json',
      },
    });
    return response.data.resourceLookup;
  }




  const getReportExecution = async (reportPath: string, format = 'pdf') => {


    try {
      const response = await httpClient.get(`${BASE_URL}`, {
        responseType: 'blob',
        headers: {
          'Accept': 'application/pdf, application/json'
        }
      });
      return URL.createObjectURL(response.data);
    } catch (error: any) {
      if (error.response && error.response.data instanceof Blob) {
        const text = await error.response.data.text();
        console.error('JasperReports Error Detail:', text);
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
