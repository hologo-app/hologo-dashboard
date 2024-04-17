import axios from 'axios';
// const BASE_URL = 'https://hologo-dash-api.onrender.com';
const BASE_URL = 'http://localhost:3500'

// const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3500' : ''

console.log(process.env.NODE_ENV)

export default axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json'},
    withCredentials: true,
});

