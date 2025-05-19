import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import authService from '@/services/authService';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const loading = ref(false);
  const error = ref(null);
  const authStatus = ref(!!localStorage.getItem('token')); 

  const isAuthenticated = computed(() => authStatus.value);
  
  const userInitials = computed(() => {
    if (!user.value?.full_name && !user.value?.name) return '';
    
    const nameToUse = user.value?.full_name || user.value?.name;
    return nameToUse
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  });
  // Методи
  async function loadUserProfile() {
    if (!isAuthenticated.value) return null;
    
    try {
      loading.value = true;
      const userData = await authService.getCurrentUser();
      user.value = userData;
      return userData;
    } catch (err) {
      console.error('Error loading user profile:', err);
      error.value = 'Не вдалося завантажити профіль користувача';
      // Якщо профіль не завантажується, можливо, токен недійсний
      if (err.response && err.response.status === 401) {
        await logout(); // Автоматичний вихід при невалідному токені
      }
      return null;
    } finally {
      loading.value = false;
    }
  }

  async function login(credentials) {
    try {
      loading.value = true;
      error.value = null;
      
      const response = await authService.login(credentials);
      
      // Встановлюємо статус авторизації
      authStatus.value = true;
      
      // Завантажуємо профіль користувача
      await loadUserProfile();
      
      return { success: true, data: response };
    } catch (err) {
      console.error('Login error:', err);
      
      if (err.response && err.response.data) {
        error.value = err.response.data.detail || 'Помилка під час входу. Перевірте ваші дані.';
      } else {
        error.value = 'Сервер недоступний. Спробуйте пізніше.';
      }
      
      return { success: false, error: error.value };
    } finally {
      loading.value = false;
    }
  }
  
  async function register(userData) {
    try {
      loading.value = true;
      error.value = null;
      
      const response = await authService.register(userData);
      
      // Встановлюємо статус авторизації, якщо реєстрація авторизує користувача
      if (response.access_token) {
        authStatus.value = true;
        await loadUserProfile();
      }
      
      return { success: true, data: response };
    } catch (err) {
      console.error('Registration error:', err);
      
      if (err.response && err.response.data) {
        error.value = err.response.data.detail || 'Помилка під час реєстрації. Перевірте введені дані.';
      } else {
        error.value = 'Сервер недоступний. Спробуйте пізніше.';
      }
      
      return { success: false, error: error.value };
    } finally {
      loading.value = false;
    }
  }
  
  async function logout() {
    // Викликаємо сервіс для виходу
    authService.logout();
    
    // Очищаємо даний сховища
    user.value = null;
    error.value = null;
    
    // Оновлюємо статус авторизації
    authStatus.value = false;
    
    return true;
  }
  
  // Ініціалізація сховища - викликається при запуску додатку
  async function init() {
    // Перевіряємо токен у localStorage
    const token = localStorage.getItem('token');
    authStatus.value = !!token;
    
    if (authStatus.value) {
      await loadUserProfile();
    }
  }

  return {
    user,
    loading,
    error,
    authStatus,
    isAuthenticated,
    userInitials,
    login,
    register,
    logout,
    loadUserProfile,
    init
  };
});