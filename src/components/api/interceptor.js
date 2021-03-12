import axios from "axios";

// Add a request interceptor
const axiosInterceptor = axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers['Access-Control-Allow-Origin'] = "*";
    if (token) {
        config.headers.Authorization =  `Bearer ${token}`;
    }

    return config;
});

export default axiosInterceptor;