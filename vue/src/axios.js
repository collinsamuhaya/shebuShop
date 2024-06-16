import axios from 'axios';
import store from './store'

const axiosClient = axios.create({
   baseURL:`http://localhost:80/api`
   // baseURL: `${import.meta.meta.VITE_API_BASE_URL}/api`
})


export default axiosClient;
