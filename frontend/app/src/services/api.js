import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost/desafios/backend/controller/'
});

export default api;