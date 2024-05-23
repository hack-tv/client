import axios from 'axios';

import { API_URL } from '../constants/url';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    // config.headers['ngrok-skip-browser-warning'] = 'true';
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstance;
