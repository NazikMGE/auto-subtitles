<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900">
    <div class="main-container py-8 px-4 sm:px-6 lg:px-8">
      <!-- Заголовок сторінки -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-slate-900 dark:text-white">Мій профіль</h1>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Перегляд та редагування особистої інформації
        </p>
      </div>

      <!-- Основний контент -->
      <div class="grid md:grid-cols-4 gap-8">
        <!-- Лівий сайдбар з фото та статистикою -->
        <div class="md:col-span-1 space-y-6">
          <!-- Секція з аватаркою -->
          <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700">
            <div class="flex flex-col items-center">
              <div class="relative group">
                <div class="w-32 h-32 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4 overflow-hidden">
                  <img 
                    :src="userAvatarUrl" 
                    alt="User avatar" 
                    class="w-full h-full object-cover"
                  />
                </div>
                <button 
                  @click="handleAvatarUpload"
                  class="absolute inset-0 w-32 h-32 flex items-center justify-center rounded-full bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <CameraIcon class="w-6 h-6 text-white" />
                </button>
                <input 
                  ref="avatarInputRef"
                  type="file" 
                  class="hidden" 
                  accept="image/*" 
                  @change="onAvatarSelected"
                />
              </div>
              <h2 class="text-xl font-bold text-slate-900 dark:text-white">{{ userName }}</h2>
              <p class="text-sm text-slate-500 dark:text-slate-400">{{ userEmail }}</p>
              
              <div class="mt-4 w-full text-center">
                <span class="text-sm text-slate-500 dark:text-slate-400">
                  Зареєстровано: {{ formatDate(userRegistrationDate) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Статистика користувача -->
          <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700">
            <h3 class="text-sm font-medium text-slate-900 dark:text-white uppercase tracking-wider mb-4">Ваша статистика</h3>
            <div class="space-y-4">
              <div class="flex justify-between">
                <span class="text-sm text-slate-500 dark:text-slate-400">Проектів створено</span>
                <span class="text-sm font-medium text-slate-900 dark:text-white">{{ userStats.projects }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-slate-500 dark:text-slate-400">Завершено проектів</span>
                <span class="text-sm font-medium text-slate-900 dark:text-white">{{ userStats.completedProjects }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-slate-500 dark:text-slate-400">Загальний час обробки</span>
                <span class="text-sm font-medium text-slate-900 dark:text-white">{{ userStats.totalProcessingTime }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-slate-500 dark:text-slate-400">Останній вхід</span>
                <span class="text-sm font-medium text-slate-900 dark:text-white">{{ userStats.lastLogin }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Основний контент - форми редагування профілю -->
        <div class="md:col-span-3 space-y-6">
          <!-- Форма особистої інформації -->
          <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700">
            <h3 class="text-lg font-medium text-slate-900 dark:text-white mb-6">Особиста інформація</h3>
            
            <form @submit.prevent="savePersonalInfo" class="space-y-6">
              <!-- Повне ім'я -->
              <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div class="sm:col-span-3">
                  <label for="first_name" class="block text-sm font-medium text-slate-700 dark:text-slate-300">Ім'я</label>
                  <div class="mt-1">
                    <input 
                      type="text" 
                      id="first_name" 
                      v-model="personalInfo.firstName"
                      autocomplete="given-name" 
                      class="block w-full rounded-md border-slate-300 dark:border-slate-600 dark:bg-slate-700/50 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:focus:border-indigo-500 dark:focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div class="sm:col-span-3">
                  <label for="last_name" class="block text-sm font-medium text-slate-700 dark:text-slate-300">Прізвище</label>
                  <div class="mt-1">
                    <input 
                      type="text" 
                      id="last_name" 
                      v-model="personalInfo.lastName"
                      autocomplete="family-name" 
                      class="block w-full rounded-md border-slate-300 dark:border-slate-600 dark:bg-slate-700/50 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:focus:border-indigo-500 dark:focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              <!-- Email адреса -->
              <div>
                <label for="email" class="block text-sm font-medium text-slate-700 dark:text-slate-300">Email адреса</label>
                <div class="mt-1 relative rounded-md shadow-sm">
                  <input 
                    type="email" 
                    id="email" 
                    v-model="personalInfo.email"
                    autocomplete="email" 
                    disabled
                    class="block w-full rounded-md border-slate-300 dark:border-slate-600 dark:bg-slate-700/30 text-slate-500 dark:text-slate-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:focus:border-indigo-500 dark:focus:ring-indigo-500 sm:text-sm cursor-not-allowed"
                  />
                  <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                    <LockClosedIcon class="h-4 w-4 text-slate-400" aria-hidden="true" />
                  </div>
                </div>
                <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">Ваш email не може бути змінений</p>
              </div>

              <!-- Кнопки дій -->
              <div class="flex justify-end space-x-3">
                <button 
                  type="button" 
                  @click="resetPersonalInfo"
                  class="rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Скасувати
                </button>
                <button 
                  type="submit" 
                  :disabled="personalInfoLoading"
                  class="inline-flex justify-center rounded-md border border-transparent bg-blue-600 dark:bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 dark:hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <svg v-if="personalInfoLoading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Зберегти зміни
                </button>
              </div>
            </form>
          </div>

          <!-- Додаткова інформація про акаунт -->
          <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700">
            <h3 class="text-lg font-medium text-slate-900 dark:text-white mb-6">Інформація про акаунт</h3>
            
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span class="text-sm text-slate-600 dark:text-slate-400">Статус акаунту</span>
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                  Активний
                </span>
              </div>
              
              <div class="flex items-center justify-between">
                <span class="text-sm text-slate-600 dark:text-slate-400">Дата створення</span>
                <span class="text-sm text-slate-900 dark:text-white">
                  {{ formatDate(userRegistrationDate) }}
                </span>
              </div>
              
              <!-- Кнопка для переходу на сторінку налаштувань -->
              <div class="pt-4 mt-4 border-t border-slate-200 dark:border-slate-700">
                <router-link 
                  to="/settings" 
                  class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-indigo-500"
                >
                  <CogIcon class="mr-2 h-4 w-4" aria-hidden="true" />
                  Налаштування акаунту
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import api from '@/services/api';
import {
  CameraIcon,
  LockClosedIcon,
  CogIcon
} from '@heroicons/vue/24/outline';

const router = useRouter();
const authStore = useAuthStore();
const avatarInputRef = ref(null);

// Створюємо простий composable для сповіщень
const useToast = () => {
  const success = (message) => {
    // Використовуємо alert для простоти, в реальному додатку тут мав би бути компонент сповіщень
    alert(`Успіх: ${message}`);
  };
  
  const error = (message) => {
    // Використовуємо alert для простоти, в реальному додатку тут мав би бути компонент сповіщень
    alert(`Помилка: ${message}`);
  };
  
  return {
    success,
    error
  };
};

const toast = useToast();

// Дані користувача з authStore
const userEmail = computed(() => {
  return authStore.user?.email || '';
});

const userRegistrationDate = computed(() => {
  return authStore.user?.createdAt || new Date();
});

const userName = computed(() => {
  if (authStore.user?.full_name) return authStore.user.full_name;
  if (authStore.user?.name) return authStore.user.name;
  
  // Якщо у нас є firstName і lastName з форми, використовуємо їх
  if (personalInfo.value.firstName || personalInfo.value.lastName) {
    return `${personalInfo.value.firstName} ${personalInfo.value.lastName}`.trim();
  }
  
  // Інакше показуємо ім'я користувача з email
  return userEmail.value.split('@')[0];
});

const userAvatarUrl = computed(() => {
  // Перевіряємо чи є аватар у користувача
  if (authStore.user?.avatarUrl) {
    // Додаємо параметр запиту з часом для запобігання кешуванню
    const timestamp = new Date().getTime();
    const baseUrl = import.meta.env.VITE_API_URL || '';
    let avatarPath = authStore.user.avatarUrl;
    
    // Виводимо додаткову інформацію для відладки
    console.log('Avatar path from API:', avatarPath);
    console.log('Base URL:', baseUrl);
    
    // Якщо avatarUrl вже має повний шлях з протоколом (http/https)
    if (avatarPath.startsWith('http')) {
      return `${avatarPath}${avatarPath.includes('?') ? '&' : '?'}t=${timestamp}`;
    }
    
    // Переконуємося, що шлях починається зі слеша
    if (!avatarPath.startsWith('/')) {
      avatarPath = '/' + avatarPath;
    }
    
    // Видаляємо зайвий слеш між baseUrl та avatarPath
    if (baseUrl.endsWith('/') && avatarPath.startsWith('/')) {
      avatarPath = avatarPath.substring(1);
    }
    
    // Формуємо повний URL
    const fullUrl = `${baseUrl}${avatarPath}${avatarPath.includes('?') ? '&' : '?'}t=${timestamp}`;
    console.log('Final avatar URL:', fullUrl);
    return fullUrl;
  }
  
  // Генеруємо аватар на основі імені користувача
  const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(userName.value)}&background=random&color=fff&size=128&font-size=0.45`;
  console.log('Using fallback avatar URL:', fallbackUrl);
  return fallbackUrl;
});

// Статистика користувача
const userStats = ref({
  projects: 8,
  completedProjects: 5,
  totalProcessingTime: '4 год 32 хв',
  lastLogin: '2 години тому',
});

// Стан форми особистої інформації
const personalInfo = ref({
  firstName: '',
  lastName: '',
  email: userEmail.value
});

const originalPersonalInfo = ref({...personalInfo.value});
const personalInfoLoading = ref(false);
const avatarLoading = ref(false);

// Метод для обробки завантаження аватара
const onAvatarSelected = async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  
  // Перевірка типу файлу
  if (!file.type.startsWith('image/')) {
    toast.error('Дозволені лише файли зображень');
    return;
  }
  
  // Перевірка розміру файлу (макс. 2МБ)
  const maxSize = 2 * 1024 * 1024; // 2МБ в байтах
  if (file.size > maxSize) {
    toast.error('Розмір файлу не повинен перевищувати 2МБ');
    return;
  }
  
  avatarLoading.value = true;
  
  try {
    // Створення FormData для завантаження файлу
    const formData = new FormData();
    formData.append('file', file);
    
    // Відправка файлу на сервер
    // У реальному додатку тут був би запит до API
    /*
    const response = await api.post('/api/v1/users/me/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    // Оновлення даних користувача у сховищі
    if (response.data && response.data.avatarUrl) {
      // Оновити дані користувача в authStore
      await authStore.loadUserProfile();
      toast.success('Аватар успішно оновлено');
    }
    */
    
    // Для демонстрації просто імітуємо запит
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Оновлюємо локальний URL аватара для демонстрації
    // В реальному додатку це мало б надходити з відповіді сервера
    const fakeUrl = URL.createObjectURL(file);
    toast.success('Аватар успішно оновлено');
    
    // Оновити дані користувача в authStore (імітація)
    if (authStore.user) {
      authStore.user = {
        ...authStore.user,
        avatarUrl: fakeUrl
      };
    }
    
  } catch (error) {
    console.error('Помилка при завантаженні аватара:', error);
    toast.error('Не вдалося завантажити аватар');
  } finally {
    avatarLoading.value = false;
    // Скидаємо вибір файлу, щоб можна було повторно вибрати той самий файл
    if (avatarInputRef.value) {
      avatarInputRef.value.value = '';
    }
  }
};

// Завантаження даних при створенні компонента
onMounted(async () => {
  try {
    // Якщо можливо, отримуємо актуальні дані користувача
    if (authStore.user) {
      // Заповнюємо форму даними користувача
      personalInfo.value = {
        firstName: authStore.user.first_name || '',
        lastName: authStore.user.last_name || '',
        email: authStore.user.email || ''
      };
      
      // Зберігаємо копію для можливості скасування змін
      originalPersonalInfo.value = {...personalInfo.value};
    }
    
    // Тут було б завантаження статистики користувача з API
    // const statsResponse = await api.get('/api/v1/users/me/stats');
    // userStats.value = statsResponse.data;
    
  } catch (error) {
    console.error('Помилка при завантаженні даних профілю:', error);
    toast.error('Не вдалося завантажити дані профілю');
  }
});

// Методи для роботи з аватаром
const handleAvatarUpload = () => {
  console.log("Clicking avatar upload button");
  // Переконайтеся, що avatarInputRef існує
  if (avatarInputRef.value) {
    avatarInputRef.value.click();
  } else {
    console.error("Avatar input reference is null");
  }
};

// Методи для роботи з особистою інформацією
const savePersonalInfo = async () => {
  personalInfoLoading.value = true;
  
  try {
    // Створення даних для оновлення
    const updateData = {
      first_name: personalInfo.value.firstName,
      last_name: personalInfo.value.lastName
    };
    
    // Тут було б збереження даних через API
    // const response = await api.put('/api/v1/users/me', updateData);
    
    // Імітуємо запит до сервера
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Оновлюємо дані користувача в authStore (імітація)
    if (authStore.user) {
      authStore.user = {
        ...authStore.user,
        first_name: updateData.first_name,
        last_name: updateData.last_name
      };
    }
    
    // Оновлюємо копію для можливості скасування змін
    originalPersonalInfo.value = {...personalInfo.value};
    
    toast.success('Особиста інформація успішно оновлена!');
  } catch (error) {
    console.error('Помилка при збереженні особистої інформації:', error);
    toast.error('Не вдалося оновити особисту інформацію');
  } finally {
    personalInfoLoading.value = false;
  }
};

const resetPersonalInfo = () => {
  personalInfo.value = {...originalPersonalInfo.value};
};

// Форматування дати
const formatDate = (date) => {
  if (!date) return '';
  
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Date(date).toLocaleDateString('uk-UA', options);
};
</script>