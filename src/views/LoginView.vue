<template>
  <div class="min-h-[calc(100vh-10rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900">
    <div class="max-w-md w-full space-y-10 bg-white dark:bg-slate-800 p-8 sm:p-12 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700">
      <div>
        <div class="flex justify-center mb-6">
           <router-link to="/" class="flex items-center space-x-2 animate-breath">
            <img :src="logoUrl" alt="AutoSubtitles Logo" class="h-8 md:h-10 w-auto mr-2 "> <span class="text-2xl font-extrabold tracking-tight">
              <span class="text-slate-800 dark:text-white">Auto</span><span class="text-blue-600 dark:text-indigo-400">Subtitles</span>
            </span>
          </router-link>
        </div>
        <h2 class="text-center text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Вітаємо знову!
        </h2>
        <p class="mt-2 text-center text-sm text-slate-600 dark:text-slate-400">
          Немає акаунту?
          <router-link to="/register" class="font-medium text-blue-600 hover:text-blue-500 dark:text-indigo-400 dark:hover:text-indigo-300">
            Створити зараз
          </router-link>
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div>
          <label for="email-address" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email адреса</label>
          <input id="email-address" name="email" type="email" autocomplete="email" required v-model="email"
                 class="appearance-none block w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-blue-500 dark:focus:ring-indigo-500 focus:border-blue-500 dark:focus:border-indigo-500 sm:text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-50"
                 placeholder="you@example.com">
        </div>

        <div>
          <div class="flex items-center justify-between mb-1">
            <label for="password" class="block text-sm font-medium text-slate-700 dark:text-slate-300">Пароль</label>
            <div class="text-sm">
              <a href="#" class="font-medium text-blue-600 hover:text-blue-500 dark:text-indigo-400 dark:hover:text-indigo-300">
                Забули пароль?
              </a>
            </div>
          </div>
          <input id="password" name="password" type="password" autocomplete="current-password" required v-model="password"
                 class="appearance-none block w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-blue-500 dark:focus:ring-indigo-500 focus:border-blue-500 dark:focus:border-indigo-500 sm:text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-50"
                 placeholder="••••••••">
        </div>
        
        <div class="flex items-center">
            <input id="remember-me" name="remember-me" type="checkbox"
                   class="h-4 w-4 text-blue-600 dark:text-indigo-600 focus:ring-blue-500 dark:focus:ring-indigo-500 border-slate-300 dark:border-slate-600 rounded bg-slate-50 dark:bg-slate-700">
            <label for="remember-me" class="ml-2 block text-sm text-slate-900 dark:text-slate-300">
              Запам'ятати мене
            </label>
          </div>

        <div>
          <BaseButton type="submit" variant="primary" size="lg" :block="true" :loading="isLoading">
            Увійти
          </BaseButton>
        </div>
      </form>
       <p v-if="errorMsg" class="mt-4 text-center text-sm text-red-600 dark:text-red-400">{{ errorMsg }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import BaseButton from '../components/ui/BaseButton.vue';
import { useRouter } from 'vue-router';
import logoUrl from '@/assets/logo.svg'; // Імпорт логотипу

const router = useRouter();
const email = ref('');
const password = ref('');
const isLoading = ref(false);
const errorMsg = ref('');

const handleLogin = async () => {
  isLoading.value = true;
  errorMsg.value = '';
  await new Promise(resolve => setTimeout(resolve, 1500));
  if (email.value === 'test@example.com' && password.value === 'password') {
    alert('Успішний вхід! (Імітація)');
    router.push('/');
  } else {
    errorMsg.value = 'Неправильний email або пароль.';
  }
  isLoading.value = false;
}
</script>