import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://ppwa-api-exam.onrender.com/', // Replace with your API URL
});

export default instance;
