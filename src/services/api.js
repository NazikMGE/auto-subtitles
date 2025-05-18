// services/api.js
import axios from 'axios';

// Створюємо екземпляр axios з базовим URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Додаємо інтерсептор для запитів
api.interceptors.request.use(
  (config) => {
    // Додаємо авторизаційний токен до всіх запитів, якщо він є
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Додаємо інтерсептор для відповідей
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Перехоплюємо помилки авторизації (401) та оновлення токена (403)
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // Можна додати логіку для оновлення токена або автоматичного виходу
      localStorage.removeItem('token');
      
      // Якщо ми на захищеному маршруті, перенаправляємо на сторінку входу
      const currentPath = window.location.pathname;
      if (currentPath !== '/login' && currentPath !== '/register' && !currentPath.startsWith('/reset-password')) {
        window.location.href = '/login'; // Або використовуйте router.push з Vue Router
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;