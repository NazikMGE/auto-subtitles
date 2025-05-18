<template>
  <section class="py-16 md:py-24 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
    <div class="main-container">
      <div class="text-center mb-14 md:mb-20">
        <span class="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-indigo-400 mb-2 block">
          Ваші проекти
        </span>
        <h2 class="section-title">
          Останні <span class="text-blue-600 dark:text-indigo-400">проекти</span> субтитрів
        </h2>
        <p class="section-subtitle mt-4">
          Ваші недавні файли та проекти з субтитрами. Продовжіть роботу або створіть щось нове.
        </p>
      </div>

      <!-- Показуємо карточки з проектами користувача або заглушку -->
      <div v-if="isLoading" class="flex justify-center my-10">
        <div class="animate-spin h-12 w-12 border-4 border-blue-500 dark:border-indigo-500 rounded-full border-t-transparent"></div>
      </div>
      
      <div v-else-if="projects.length > 0" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Карточки з проектами -->
        <div
          v-for="project in projects"
          :key="project.id"
          class="bg-white dark:bg-slate-800/70 rounded-xl shadow-lg hover:shadow-xl p-5 transition-all duration-300 transform hover:scale-[1.02] border border-slate-200 dark:border-slate-700/50"
        >
          <div class="flex items-start justify-between mb-4">
            <div class="w-12 h-12 flex-shrink-0 rounded-lg bg-blue-100 dark:bg-indigo-500/20 text-blue-600 dark:text-indigo-400 flex items-center justify-center">
              <ChatBubbleLeftRightIcon class="h-7 w-7" />
            </div>
            <div class="text-sm text-slate-500 dark:text-slate-400">
              {{ formatDate(project.createdAt) }}
            </div>
          </div>
          
          <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-2 truncate">
            {{ project.originalFilename || 'Проект без назви' }}
          </h3>
          
          <p class="text-sm text-slate-600 dark:text-slate-300 mb-4 line-clamp-2">
            {{ project.description || getDefaultDescription(project) }}
          </p>
          
          <div class="flex items-center justify-between mt-auto pt-3 border-t border-slate-200 dark:border-slate-700/50">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" 
                  :class="getStatusClass(project.status)">
              {{ getStatusText(project.status) }}
            </span>
            
            <button @click="goToProject(project.id)" class="text-blue-600 dark:text-indigo-400 hover:text-blue-800 dark:hover:text-indigo-300 inline-flex items-center text-sm font-medium">
              Відкрити
              <ArrowRightIcon class="ml-1 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      
      <div v-else class="text-center py-16">
        <div class="mx-auto w-24 h-24 bg-blue-50 dark:bg-indigo-900/20 rounded-full flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-blue-500 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-2">Немає проектів</h3>
        <p class="text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-8">
          Ви ще не створили жодного проекту субтитрів. Почніть з завантаження відео або аудіо файлу.
        </p>
        <BaseButton variant="primary" size="lg" @click="goToNewProject" class="!px-8">
          Створити перший проект
          <template #iconRight>
            <svg xmlns="http://www.w3.org/2000/svg" class="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
          </template>
        </BaseButton>
      </div>

      <!-- Кнопка "Перегляд всіх проектів" відображається тільки якщо є проекти -->
      <div v-if="projects.length > 0" class="text-center mt-12">
        <BaseButton variant="ghost" size="lg" @click="goToAllProjects">
          Переглянути всі проекти
          <template #iconRight>
            <svg xmlns="http://www.w3.org/2000/svg" class="ml-1.5 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </template>
        </BaseButton>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import BaseButton from '../ui/BaseButton.vue';
import {
  ChatBubbleLeftRightIcon,
  PlusIcon,
  ArrowRightIcon
} from '@heroicons/vue/24/outline';

const router = useRouter();
const authStore = useAuthStore();

// Дані для демонстрації на головній сторінці 
// У реальному додатку їх потрібно завантажувати з API
const projects = ref([]);
const isLoading = ref(true);

// Замість цієї функції потрібно буде реалізувати справжній запит до API
const fetchProjects = async () => {
  isLoading.value = true;
  
  try {
    // Тут має бути запит до API
    // Наприклад: const response = await api.get('/api/v1/jobs?limit=3&sort=desc');
    
    // Імітуємо затримку мережі
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Тимчасові дані для демонстрації
    projects.value = [
      {
        id: '1',
        originalFilename: 'Презентація продукту.mp4',
        description: 'Відео презентації нового продукту для маркетингової кампанії',
        status: 'completed',
        createdAt: new Date(Date.now() - 3600000 * 24) // вчора
      },
      {
        id: '2',
        originalFilename: 'Інтерв\'ю з розробником.mp3',
        description: 'Аудіо-інтерв\'ю для корпоративного блогу',
        status: 'processing_online',
        createdAt: new Date(Date.now() - 3600000 * 2) // 2 години тому
      },
      {
        id: '3',
        originalFilename: 'Вебінар-2023.mp4',
        description: null,
        status: 'queued',
        createdAt: new Date() // зараз
      }
    ];
  } catch (error) {
    console.error('Помилка при завантаженні проектів:', error);
    projects.value = [];
  } finally {
    isLoading.value = false;
  }
};

// Форматуємо дату для відображення
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffHours = diffMs / (1000 * 60 * 60);
  
  if (diffHours < 24) {
    if (diffHours < 1) {
      return 'Щойно';
    }
    return `${Math.floor(diffHours)} год тому`;
  }
  
  if (diffHours < 48) {
    return 'Вчора';
  }
  
  return date.toLocaleDateString('uk-UA', { 
    day: 'numeric', 
    month: 'short'
  });
};

// Отримуємо текст статусу
const getStatusText = (status) => {
  switch (status) {
    case 'queued': return 'У черзі';
    case 'processing_online': return 'Обробка';
    case 'processing_local': return 'Обробка';
    case 'completed': return 'Завершено';
    case 'error': return 'Помилка';
    default: return 'Невідомо';
  }
};

// Отримуємо класи стилів для статусу
const getStatusClass = (status) => {
  switch (status) {
    case 'queued': 
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
    case 'processing_online':
    case 'processing_local': 
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
    case 'completed': 
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
    case 'error': 
      return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
    default: 
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
  }
};

// Отримуємо опис проекту за замовчуванням, якщо відсутній
const getDefaultDescription = (project) => {
  const ext = project.originalFilename?.split('.').pop()?.toLowerCase();
  
  if (ext === 'mp4' || ext === 'mov' || ext === 'avi') {
    return 'Відеофайл для створення субтитрів';
  } 
  if (ext === 'mp3' || ext === 'wav' || ext === 'ogg') {
    return 'Аудіофайл для транскрипції';
  }
  
  return 'Файл для обробки';
};

// Функції для навігації
const goToProject = (projectId) => {
  router.push(`/projects/${projectId}`);
};

const goToAllProjects = () => {
  router.push('/my-projects');
};

const goToNewProject = () => {
  router.push('/projects/new');
};

// Завантажуємо проекти при створенні компонента
onMounted(() => {
  fetchProjects();
});
</script>