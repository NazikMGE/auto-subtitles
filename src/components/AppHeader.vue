<template>
  <header class="bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg shadow-sm fixed top-0 left-0 right-0 z-[100] transition-colors duration-300">
    <nav class="main-container flex items-center justify-between h-16 md:h-20">
      <router-link to="/" class="flex-shrink-0 flex items-center space-x-2">
        <img :src="logoUrl" alt="AutoSubtitles Logo" class="h-6 md:h-8 w-auto mr-2">
        <span class="text-xl font-extrabold tracking-tight">
          <span class="text-slate-800 dark:text-white">Auto</span><span class="text-blue-600 dark:text-indigo-400">Subtitles</span>
        </span>
      </router-link>

      <div class="hidden md:flex items-center space-x-1">
        <router-link
          v-for="item in navigation"
          :key="item.name"
          :to="item.href"
          class="px-3 py-2 rounded-md text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
          active-class="text-blue-600 dark:text-indigo-400 bg-slate-100 dark:bg-slate-800 font-semibold"
        >
          {{ item.name }}
        </router-link>
      </div>

      <div class="flex items-center space-x-3">
        <div class="hidden sm:flex items-center space-x-3">
          <router-link to="/login" class="px-4 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            Вхід
          </router-link>
          <router-link to="/register" class="px-4 py-2 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 dark:focus-visible:ring-offset-slate-900 shadow-sm hover:shadow-md transition-all duration-200">
            Реєстрація
          </router-link>
        </div>
        <div class="md:hidden">
          <button @click="mobileMenuOpen = !mobileMenuOpen" class="p-2 rounded-md text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none">
            <span class="sr-only">Відкрити меню</span>
            <svg v-if="!mobileMenuOpen" class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16m-7 6h7" /></svg>
            <svg v-else class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
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
    <div v-if="mobileMenuOpen" class="md:hidden absolute top-16 inset-x-0 p-2 transition transform origin-top-right bg-white dark:bg-slate-800 shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-slate-700">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <router-link
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            @click="mobileMenuOpen = false"
            class="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-indigo-400 transition-colors"
            active-class="bg-slate-100 dark:bg-slate-700 text-blue-600 dark:text-indigo-400 font-semibold"
          >
            {{ item.name }}
          </router-link>
        </div>
        <div class="pt-4 pb-3 border-t border-slate-200 dark:border-slate-700">
          <div class="flex flex-col space-y-2 px-2">
            <router-link to="/login" @click="mobileMenuOpen = false" class="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
              Вхід
            </router-link>
            <router-link to="/register" @click="mobileMenuOpen = false" class="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 transition-colors">
              Реєстрація
            </router-link>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import logoUrl from '@/assets/logo.svg';

const navigation = [
  { name: 'Головна', href: '/' },
];

const mobileMenuOpen = ref(false);
const route = useRoute();

watch(route, () => {
  mobileMenuOpen.value = false;
});
</script>