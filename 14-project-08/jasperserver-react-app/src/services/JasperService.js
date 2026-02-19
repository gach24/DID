import axios from 'axios';

const BASE_URL = '/jasperserver/rest_v2';

const JasperService = {
    login: async (username, password) => {
        const auth = btoa(`${username}:${password}`);
        const response = await axios.get(`${BASE_URL}/serverInfo`, {
            headers: {
                Authorization: `Basic ${auth}`,
            },
        });
        if (response.status === 200) {
            localStorage.setItem('jasper_auth', auth);
            return true;
        }
        return false;
    },

    logout: () => {
        localStorage.removeItem('jasper_auth');
    },

    getAuth: () => localStorage.getItem('jasper_auth'),

    getReports: async () => {
        const auth = JasperService.getAuth();
        const response = await axios.get(`${BASE_URL}/resources?type=reportUnit&recursive=true`, {
            headers: {
                Authorization: `Basic ${auth}`,
                Accept: 'application/json',
            },
        });
        return response.data.resourceLookup;
    },

    getReportUrl: (reportPath, format = 'html') => {
        const auth = JasperService.getAuth();
        // Path needs to be prefixed with 'reports/' usually or the full path
        // We can use the report execution API or just the visualization URL
        return `http://localhost:8080/jasperserver/rest_v2/reports/${reportPath}.${format}?j_username=admin&j_password=admin`;
        // Note: Passing credentials in URL is NOT secure but for a demo it's the easiest way to bypass iframe auth issues
        // Better way is to use tokens or cookie-based auth
    },

    getReportExecution: async (reportPath, format = 'pdf') => {
        const auth = JasperService.getAuth();
        // Ensure the path is handled correctly (avoid double slashes but ensure one exists)
        const path = reportPath.startsWith('/') ? reportPath : `/${reportPath}`;

        try {
            const response = await axios.get(`${BASE_URL}/reports${path}.${format}`, {
                headers: {
                    Authorization: `Basic ${auth}`,
                    'Accept': format === 'pdf' ? 'application/pdf' : 'application/json, text/plain, */*'
                },
                responseType: 'blob'
            });
            return URL.createObjectURL(response.data);
        } catch (error) {
            console.error('Error fetching report:', error);
            // Fallback: try with query parameter if the extension doesn't work (some Jasper versions prefer this)
            if (error.response && error.response.status === 400) {
                try {
                    const response = await axios.get(`${BASE_URL}/reports${path}`, {
                        params: { outputFormat: format },
                        headers: {
                            Authorization: `Basic ${auth}`,
                            'Accept': format === 'pdf' ? 'application/pdf' : '*/*'
                        },
                        responseType: 'blob'
                    });
                    return URL.createObjectURL(response.data);
                } catch (innerError) {
                    throw innerError;
                }
            }
            throw error;
        }
    }
};

export default JasperService;
