import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3001/',
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
      // Só recarrega a página se o usuário já estava logado (tinha token).
      // Se for erro de login (sem token), apenas rejeita o erro para exibir o Toast.
      if (localStorage.getItem('token')) {
        localStorage.removeItem('token');
        window.location.reload();
      }
    }
    return Promise.reject(error);
  },
);
