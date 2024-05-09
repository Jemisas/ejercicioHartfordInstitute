import axios from 'axios'

const apiBaseUrl = "http://localhost:3000";

const http = axios.create({
    baseURL: apiBaseUrl,
    headers: { 'Content-type': 'application/json' }
});

export default http;