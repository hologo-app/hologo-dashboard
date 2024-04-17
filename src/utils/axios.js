import axios from 'axios';
// const BASE_URL = 'https://hologo-dash-api.onrender.com';
const BASE_URL = '/api'

export default axios.create({
    baseURL: BASE_URL
});

