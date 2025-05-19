<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900">
    <div class="main-container py-8 px-4 sm:px-6 lg:px-8">
      <!-- Заголовок сторінки -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-slate-900 dark:text-white">Панель керування</h1>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Ласкаво просимо, {{ userName }}! Ось загальна статистика та ваші останні проекти.
        </p>
      </div>

      <!-- Картки статистики -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700">
          <div class="flex items-center">
            <div class="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
              <DocumentTextIcon class="h-6 w-6" />
            </div>
            <div class="ml-5">
              <p class="text-sm font-medium text-slate-500 dark:text-slate-400">Всього проектів</p>
              <p class="text-2xl font-semibold text-slate-900 dark:text-white">{{ stats.totalProjects }}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700">
          <div class="flex items-center">
            <div class="p-3 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400">
              <CheckCircleIcon class="h-6 w-6" />
            </div>
            <div class="ml-5">
              <p class="text-sm font-medium text-slate-500 dark:text-slate-400">Завершено</p>
              <p class="text-2xl font-semibold text-slate-900 dark:text-white">{{ stats.completedProjects }}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700">
          <div class="flex items-center">
            <div class="p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400">
              <ClockIcon class="h-6 w-6" />
            </div>
            <div class="ml-5">
              <p class="text-sm font-medium text-slate-500 dark:text-slate-400">В обробці</p>
              <p class="text-2xl font-semibold text-slate-900 dark:text-white">{{ stats.processingProjects }}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700">
          <div class="flex items-center">
            <div class="p-3 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400">
              <ClockIcon class="h-6 w-6" />
            </div>
            <div class="ml-5">
              <p class="text-sm font-medium text-slate-500 dark:text-slate-400">Загальний час</p>
              <p class="text-2xl font-semibold text-slate-900 dark:text-white">{{ stats.totalHours }} год</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Останні проекти -->
      <div class="mb-8">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-semibold text-slate-900 dark:text-white">Останні проекти</h2>
          <router-link to="/my-projects" class="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center">
            Всі проекти
            <ArrowRightIcon class="ml-1 h-4 w-4" />
          </router-link>
        </div>
        
        <div class="overflow-hidden bg-white dark:bg-slate-800 shadow-sm rounded-xl border border-slate-200 dark:border-slate-700">
          <ul class="divide-y divide-slate-200 dark:divide-slate-700">
            <li v-for="project in recentProjects" :key="project.id" class="p-4 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
              <div class="flex items-center justify-between">
                <div class="flex items-center min-w-0">
                  <div class="flex-shrink-0">
                    <div class="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <DocumentTextIcon class="h-6 w-6" />
                    </div>
                  </div>
                  <div class="ml-4 min-w-0">
                    <p class="text-sm font-medium text-slate-900 dark:text-white truncate">
                      {{ project.name }}
                    </p>
                    <p class="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {{ formatDate(project.createdAt) }}
                    </p>
                  </div>
                </div>
                <div class="ml-4 flex-shrink-0 flex items-center">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" 
                        :class="getStatusClass(project.status)">
                    {{ getStatusText(project.status) }}
                  </span>
                  <router-link 
                    :to="`/projects/${project.id}`" 
                    class="ml-4 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                  >
                    <ArrowRightIcon class="h-4 w-4" />
                  </router-link>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      
      <!-- Швидкі дії -->
      <div>
        <h2 class="text-xl font-semibold text-slate-900 dark:text-white mb-6">Швидкі дії</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button 
            @click="navigateToNewProject" 
            class="flex items-center justify-center space-x-3 p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm hover:shadow-md transform hover:-translate-y-1 transition-all duration-200"
          >
            <div class="p-3 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
              <PlusIcon class="h-5 w-5" />
            </div>
            <div class="text-left">
              <p class="text-base font-semibold text-slate-900 dark:text-white">Новий проект</p>
              <p class="text-xs text-slate-500 dark:text-slate-400">Додати файл для транскрипції</p>
            </div>
          </button>
          
          <button 
            @click="navigateToMyProjects" 
            class="flex items-center justify-center space-x-3 p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm hover:shadow-md transform hover:-translate-y-1 transition-all duration-200"
          >
            <div class="p-3 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400">
              <DocumentDuplicateIcon class="h-5 w-5" />
            </div>
            <div class="text-left">
              <p class="text-base font-semibold text-slate-900 dark:text-white">Мої проекти</p>
              <p class="text-xs text-slate-500 dark:text-slate-400">Управління всіма проектами</p>
            </div>
          </button>
          
          <button 
            @click="navigateToSettings"
            class="flex items-center justify-center space-x-3 p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm hover:shadow-md transform hover:-translate-y-1 transition-all duration-200"
          >
            <div class="p-3 rounded-full bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400">
              <Cog6ToothIcon class="h-5 w-5" />
            </div>
            <div class="text-left">
              <p class="text-base font-semibold text-slate-900 dark:text-white">Налаштування</p>
              <p class="text-xs text-slate-500 dark:text-slate-400">Змінити конфігурацію</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import {
  DocumentTextIcon, 
  CheckCircleIcon, 
  ClockIcon, 
  ArrowRightIcon,
  PlusIcon,
  DocumentDuplicateIcon,
  Cog6ToothIcon
} from '@heroicons/vue/24/outline';

const router = useRouter();
const authStore = useAuthStore();

// Дані користувача
const userName = computed(() => {
  if (authStore.user?.full_name) return authStore.user.full_name;
  if (authStore.user?.name) return authStore.user.name;
  if (authStore.user?.email) return authStore.user.email.split('@')[0];
  return 'користувач';
});

// Демо-дані для статистики
const stats = ref({
  totalProjects: 12,
  completedProjects: 7,
  processingProjects: 2,
  totalHours: 5.8
});

// Демо-дані для останніх проектів
const recentProjects = ref([
  {
    id: '1',
    name: 'Презентація продукту.mp4',
    status: 'completed',
    createdAt: new Date(Date.now() - 3600000 * 24) // вчора
  },
  {
    id: '2',
    name: 'Інтерв\'ю з розробником.mp3',
    status: 'processing',
    createdAt: new Date(Date.now() - 3600000 * 2) // 2 години тому
  },
  {
    id: '3',
    name: 'Вебінар-2023.mp4',
    status: 'queued',
    createdAt: new Date() // зараз
  }
]);

// Допоміжні функції
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('uk-UA', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const getStatusText = (status) => {
  switch (status) {
    case 'queued': return 'У черзі';
    case 'processing': return 'Обробка';
    case 'completed': return 'Завершено';
    case 'error': return 'Помилка';
    default: return 'Невідомо';
  }
};

const getStatusClass = (status) => {
  switch (status) {
    case 'queued': 
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
    case 'processing': 
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
    case 'completed': 
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
    case 'error': 
      return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
    default: 
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
  }
};

// Функції навігації
const navigateToNewProject = () => {
  router.push('/projects/new');
};

const navigateToMyProjects = () => {
  router.push('/my-projects');
};

const navigateToSettings = () => {
  router.push('/settings');
};

// Завантаження даних при створенні компонента
onMounted(() => {
  // Тут би мав бути запит до API для отримання реальних даних
  console.log('Dashboard mounted, loading data...');
});
</script>