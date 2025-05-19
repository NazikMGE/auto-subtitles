// services/tokenService.js
/**
 * Сервіс для управління JWT токенами
 * Містить функції для роботи з токенами автентифікації, перевірки їхнього терміну дії
 * та інші пов'язані операції.
 */

// Значення відповідає ACCESS_TOKEN_EXPIRE_MINUTES на бекенді
// За замовчуванням у вашій конфігурації 1440 хвилин (24 години)
const TOKEN_EXPIRATION_MINUTES = 1440;

// Буфер для завчасного оновлення токена (за 5 хвилин до кінця терміну)
const TOKEN_EXPIRATION_BUFFER_MINUTES = 5;

/**
 * Перевіряє чи термін дії токена закінчився або закінчиться найближчим часом
 * @param {number} bufferMinutes - Буфер часу в хвилинах (за скільки до кінця терміну вважати токен застарілим)
 * @returns {boolean} - true, якщо токен закінчився або закінчиться в межах буфера
 */
const isTokenExpired = (bufferMinutes = TOKEN_EXPIRATION_BUFFER_MINUTES) => {
  const token = localStorage.getItem('token');
  if (!token) return true;
  
  const tokenCreatedAt = localStorage.getItem('token_created_at');
  if (!tokenCreatedAt) return true;
  
  const now = Date.now();
  const tokenAgeMs = now - parseInt(tokenCreatedAt);
  const tokenAgeMinutes = tokenAgeMs / (1000 * 60);
  
  return tokenAgeMinutes >= (TOKEN_EXPIRATION_MINUTES - bufferMinutes);
};

/**
 * Зберігає токен та його метадані в локальному сховищі
 * @param {string} token - JWT токен
 */
const saveToken = (token) => {
  localStorage.setItem('token', token);
  localStorage.setItem('token_created_at', Date.now().toString());
};

/**
 * Видаляє токен та пов'язані дані з локального сховища
 */
const removeToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('token_created_at');
};

/**
 * Отримує інформацію про час життя токена
 * @returns {Object} - об'єкт з інформацією про час життя токена
 */
const getTokenLifetimeInfo = () => {
  const tokenCreatedAt = localStorage.getItem('token_created_at');
  if (!tokenCreatedAt) {
    return {
      isValid: false,
      createdAt: null,
      expiresAt: null,
      remainingMinutes: 0,
      percentRemaining: 0
    };
  }
  
  const createdAtDate = new Date(parseInt(tokenCreatedAt));
  const expiresAt = new Date(parseInt(tokenCreatedAt) + TOKEN_EXPIRATION_MINUTES * 60 * 1000);
  const now = new Date();
  
  const totalLifetimeMs = TOKEN_EXPIRATION_MINUTES * 60 * 1000;
  const elapsedMs = now - createdAtDate;
  const remainingMs = Math.max(0, totalLifetimeMs - elapsedMs);
  const remainingMinutes = Math.floor(remainingMs / (60 * 1000));
  const percentRemaining = Math.max(0, Math.floor((remainingMs / totalLifetimeMs) * 100));
  
  return {
    isValid: remainingMinutes > 0,
    createdAt: createdAtDate,
    expiresAt: expiresAt,
    remainingMinutes: remainingMinutes,
    percentRemaining: percentRemaining
  };
};

export default {
  isTokenExpired,
  saveToken,
  removeToken,
  getTokenLifetimeInfo,
  TOKEN_EXPIRATION_MINUTES
};