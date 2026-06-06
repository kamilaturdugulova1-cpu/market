import axios from 'axios';

const axiosApi = axios.create({
    baseURL: 'https://kama-market-default-rtdb.europe-west1.firebasedatabase.app/'
});

export default axiosApi;