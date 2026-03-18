import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3001/api',
});
// Request interceptor for auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      // Redirect to login or dispatch logout
      window.location.reload();
    }
    return Promise.reject(error);
  },
);
