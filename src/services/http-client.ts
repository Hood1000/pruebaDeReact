import axios from 'axios';

const API_BASE_URL = 'https://68afa6eeb91dfcdd62bcc2c2.mockapi.io/api/v1/'; 

const httpClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default httpClient;
