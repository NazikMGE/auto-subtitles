<template>
  <header class="bg-white/90 dark:bg-slate-900/95 backdrop-blur-lg shadow-sm fixed top-0 left-0 right-0 z-[100] transition-colors duration-300 border-b border-slate-200 dark:border-slate-800">
    <nav class="main-container flex items-center justify-between h-16 md:h-20">
      <!-- Логотип перенаправляє на різні сторінки в залежності від автентифікації -->
      <router-link :to="logoTargetLink" class="flex-shrink-0 flex items-center space-x-2 group">
        <img :src="logoUrl" alt="AutoSubtitles Logo" class="h-7 md:h-8 w-auto transform group-hover:scale-105 transition-transform duration-200">
        <span class="text-xl font-extrabold tracking-tight">
          <span class="text-slate-800 dark:text-white">Auto</span><span class="text-blue-600 dark:text-indigo-400">Subtitles</span>
        </span>
      </router-link>

      <!-- Навігація залежить від стану автентифікації -->
      <div class="hidden md:flex items-center space-x-1">
        <router-link
          v-for="item in currentNavigation"
          :key="item.name"
          :to="item.href"
          class="px-3 py-2 rounded-md text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all duration-200"
          active-class="!text-blue-600 dark:!text-indigo-400 bg-slate-100 dark:bg-slate-800"
        >
          <component v-if="item.icon" :is="item.icon" class="h-4 w-4 inline mr-1.5 -mt-0.5" />
          {{ item.name }}
        </router-link>
        
        <!-- Додатковий пункт для авторизованих користувачів перегляду публічної сторінки -->
        <router-link 
          v-if="isLoggedIn" 
          to="/" 
          class="px-3 py-2 rounded-md text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all duration-200"
          exact-active-class="!text-blue-600 dark:!text-indigo-400 bg-slate-100 dark:bg-slate-800"
        >
          <InformationCircleIcon class="h-4 w-4 inline mr-1.5 -mt-0.5" />
          Про сервіс
        </router-link>
      </div>

      <div class="flex items-center space-x-3 md:space-x-4">
        <template v-if="!isLoggedIn">
          <div class="hidden sm:flex items-center space-x-2">
            <router-link to="/login" class="px-4 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors duration-150">
              Вхід
            </router-link>
            <router-link to="/register" class="px-4 py-2 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 dark:focus-visible:ring-offset-slate-900 shadow-sm hover:shadow-md transition-all duration-200">
              Реєстрація
            </router-link>
          </div>
        </template>

        <template v-if="isLoggedIn">
          <button type="button" @click="createNewProject" title="Створити новий проект" class="hidden sm:inline-flex items-center p-2 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-900 transition-all duration-200">
            <PlusIcon class="h-5 w-5" />
             <span class="ml-1.5 hidden lg:inline text-sm font-medium">Створити</span>
          </button>

          <button type="button" title="Сповіщення" class="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-900 transition-colors">
            <span class="sr-only">View notifications</span>
            <BellIcon class="h-6 w-6" />
          </button>

          <div class="relative">
            <button @click="userMenuOpen = !userMenuOpen" type="button" class="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-900" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
              <span class="sr-only">Open user menu</span>
              <img class="h-9 w-9 rounded-full object-cover border-2 border-transparent hover:border-indigo-400 transition-colors" :src="userAvatarUrl" alt="User avatar">
            </button>
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <div v-if="userMenuOpen" class="origin-top-right absolute right-0 mt-2 w-60 rounded-xl shadow-lg py-1 bg-white dark:bg-slate-800 ring-1 ring-black ring-opacity-5 dark:ring-slate-700 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                <div class="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
                  <p class="text-sm font-semibold text-slate-900 dark:text-white truncate">{{ userName }}</p>
                  <p class="text-xs text-slate-500 dark:text-slate-400 truncate">{{ userEmail }}</p>
                </div>
                <div class="py-1">
                  <router-link v-for="item in userMenuItems" :key="item.name" :to="item.href" @click="userMenuOpen = false" class="flex items-center px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/80 hover:text-blue-600 dark:hover:text-indigo-400 group" role="menuitem" tabindex="-1">
                     <component :is="item.icon" class="h-5 w-5 mr-3 text-slate-400 dark:text-slate-500 group-hover:text-blue-500 dark:group-hover:text-indigo-400 transition-colors" />
                    {{ item.name }}
                  </router-link>
                </div>
                <div class="border-t border-slate-200 dark:border-slate-700 py-1">
                  <button @click="handleLogout" class="flex items-center w-full text-left px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/80 hover:text-red-600 dark:hover:text-red-400 group" role="menuitem" tabindex="-1">
                    <ArrowRightStartOnRectangleIcon class="h-5 w-5 mr-3 text-slate-400 dark:text-slate-500 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors" />
                    Вийти
                  </button>
                </div>
              </div>
            </transition>
          </div>
        </template>

        <div class="md:hidden">
          <button @click="mobileMenuOpen = !mobileMenuOpen" class="p-2 rounded-md text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 focus:outline-none">
            <span class="sr-only">Відкрити меню</span>
            <Bars3Icon v-if="!mobileMenuOpen" class="h-6 w-6" />
            <XMarkIcon v-else class="h-6 w-6" />
          </button>
        </div>
      </div>
    </nav>

    <transition
      enter-active-class="duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="duration-100 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div v-if="mobileMenuOpen" class="md:hidden absolute top-16 md:top-20 inset-x-0 p-3 transition transform origin-top-right bg-white dark:bg-slate-800 shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-slate-700 rounded-b-lg">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <router-link
            v-for="item in currentNavigation"
            :key="item.name"
            :to="item.href"
            @click="closeMobileMenu"
            class="flex items-center px-3 py-2.5 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/80 hover:text-blue-600 dark:hover:text-indigo-400 transition-colors group"
            active-class="bg-slate-100 dark:bg-slate-700 text-blue-600 dark:text-indigo-400"
          >
            <component v-if="item.icon" :is="item.icon" class="h-5 w-5 mr-3 text-slate-500 dark:text-slate-400 group-hover:text-blue-500 dark:group-hover:text-indigo-400 transition-colors" />
            {{ item.name }}
          </router-link>
          
          <!-- Додаткове посилання для мобільного меню -->
          <router-link 
            v-if="isLoggedIn" 
            to="/" 
            @click="closeMobileMenu"
            class="flex items-center px-3 py-2.5 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/80 hover:text-blue-600 dark:hover:text-indigo-400 transition-colors group"
          >
            <InformationCircleIcon class="h-5 w-5 mr-3 text-slate-500 dark:text-slate-400 group-hover:text-blue-500 dark:group-hover:text-indigo-400 transition-colors" />
            Про сервіс
          </router-link>
        </div>
        <div class="pt-4 pb-3 border-t border-slate-200 dark:border-slate-700">
          <template v-if="isLoggedIn">
            <div class="flex items-center px-3 mb-3">
              <img class="h-10 w-10 rounded-full object-cover mr-3 flex-shrink-0" :src="userAvatarUrl" alt="User avatar">
              <div>
                <p class="text-base font-medium text-slate-800 dark:text-white truncate">{{ userName }}</p>
                <p class="text-sm font-medium text-slate-500 dark:text-slate-400 truncate">{{ userEmail }}</p>
              </div>
            </div>
            <div class="space-y-1 px-2">
              <router-link v-for="item in userMenuItems" :key="item.name" :to="item.href" @click="closeMobileMenu" class="flex items-center px-3 py-2.5 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/80 hover:text-blue-600 dark:hover:text-indigo-400 group">
                  <component :is="item.icon" class="h-5 w-5 mr-3 text-slate-500 dark:text-slate-400 group-hover:text-blue-500 dark:group-hover:text-indigo-400 transition-colors" />
                  {{ item.name }}
                </router-link>
              <button @click="handleLogoutAndCloseMenu" class="flex items-center w-full text-left px-3 py-2.5 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/80 hover:text-red-600 dark:hover:text-red-400 group">
                  <ArrowRightStartOnRectangleIcon class="h-5 w-5 mr-3 text-slate-500 dark:text-slate-400 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors" />
                  Вийти
                </button>
            </div>
          </template>
          <template v-else>
             <div class="flex flex-col space-y-2 px-2">
              <router-link to="/login" @click="closeMobileMenu" class="block w-full text-left px-3 py-2.5 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                Вхід
              </router-link>
              <router-link to="/register" @click="closeMobileMenu" class="block w-full text-left px-3 py-2.5 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 transition-colors">
                Реєстрація
              </router-link>
            </div>
          </template>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import logoUrl from '@/assets/logo.svg';
import {
  Bars3Icon, XMarkIcon, BellIcon, PlusIcon, HomeIcon, VideoCameraIcon,
  Cog6ToothIcon, ChartBarIcon, UserCircleIcon,
  ArrowRightStartOnRectangleIcon, InformationCircleIcon
} from '@heroicons/vue/24/outline';

// Ініціалізація сховища авторизації
const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

// Використання стану авторизації з Pinia store - ЦЕ ВИПРАВЛЕННЯ
const isLoggedIn = computed(() => authStore.isAuthenticated);
const user = computed(() => authStore.user);

// Обчислювані властивості для даних користувача
const userName = computed(() => {
  if (user.value?.full_name) return user.value.full_name;
  if (user.value?.name) return user.value.name;
  if (user.value?.email) return user.value.email.split('@')[0];
  return 'Користувач';
});

const userEmail = computed(() => {
  return user.value?.email || '';
});

const userAvatarUrl = computed(() => {
  if (user.value?.avatarUrl) return user.value.avatarUrl;
  // Генеруємо аватар на основі імені користувача
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(userName.value)}&background=random&color=fff&size=96&font-size=0.45`;
});

// Якщо авторизований користувач заходить на головну (/), ми його перенаправляємо на Dashboard
watch(
  () => [route.path, isLoggedIn.value],
  ([path, isLogged]) => {
    if (path === '/' && isLogged) {
      // В реальному додатку цей код, можливо, є в router.beforeEach
      // Можна розкоментувати за потреби
      // router.push('/dashboard');
    }
  }
);

// Перенаправлення при кліку на логотип
const logoTargetLink = computed(() => {
  return isLoggedIn.value ? '/dashboard' : '/';
});

// Навігація залежно від статусу автентифікації
const loggedOutUserNavigation = [
  { name: 'Головна', href: '/', icon: HomeIcon },
];

const loggedInUserNavigation = [
  { name: 'Панель керування', href: '/dashboard', icon: HomeIcon },
  { name: 'Мої проекти', href: '/my-projects', icon: VideoCameraIcon },
  { name: 'Аналітика', href: '/analytics', icon: ChartBarIcon },
];

const userMenuItems = [
  { name: 'Мій профіль', href: '/profile', icon: UserCircleIcon },
  { name: 'Налаштування', href: '/settings', icon: Cog6ToothIcon },
];

const currentNavigation = computed(() => {
  return isLoggedIn.value ? loggedInUserNavigation : loggedOutUserNavigation;
});

const mobileMenuOpen = ref(false);
const userMenuOpen = ref(false);

watch(route, () => {
  mobileMenuOpen.value = false;
  userMenuOpen.value = false;
});

const closeMobileMenu = () => {
  mobileMenuOpen.value = false;
};

// Функція для створення нового проекту
const createNewProject = () => {
  router.push('/projects/new');
};

// Функція для виходу з системи - ЦЕ ВИПРАВЛЕННЯ
const handleLogout = async () => {
  try {
    // Використовуємо метод logout зі сховища auth замість безпосереднього виклику authService
    await authStore.logout();
    
    // Закриваємо меню
    userMenuOpen.value = false;
    
    // Перенаправляємо користувача на головну сторінку
    router.push('/');
  } catch (error) {
    console.error('Помилка при виході:', error);
  }
};

// Функція для виходу з системи і закриття мобільного меню
const handleLogoutAndCloseMenu = () => {
  handleLogout();
  closeMobileMenu();
};

// Ініціалізація - завантаження профілю користувача, якщо вже авторизований
if (isLoggedIn.value && !user.value) {
  authStore.loadUserProfile();
}
</script>

<style scoped>
.main-container {
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}
@media (min-width: 768px) { .main-container { padding-left: 1.5rem; padding-right: 1.5rem; } }
@media (min-width: 1024px) { .main-container { padding-left: 2rem; padding-right: 2rem; } }

.animate-breath {
  animation: breath_anim 3s ease-in-out infinite alternate;
}
@keyframes breath_anim {
  from { transform: scale(1); }
  to { transform: scale(1.03); }
}
</style>