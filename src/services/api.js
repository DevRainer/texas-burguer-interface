import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3001/',
});

// Request interceptor for auth token
api.interceptors.request.use((config) => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    try {
      const user = JSON.parse(storedUser);
      if (user?.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    } catch (error) {
      console.error('Erro ao parsear user do localStorage:', error);
    }
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Se já havia user/token salvo, limpa e recarrega
      if (localStorage.getItem('user')) {
        localStorage.removeItem('user');
        window.location.reload();
      }
    }
    return Promise.reject(error);
  },
);
