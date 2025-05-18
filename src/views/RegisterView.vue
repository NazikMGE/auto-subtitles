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
          Створіть свій акаунт
        </h2>
        <p class="mt-2 text-center text-sm text-slate-600 dark:text-slate-400">
          Вже з нами?
          <router-link to="/login" class="font-medium text-blue-600 hover:text-blue-500 dark:text-indigo-400 dark:hover:text-indigo-300">
            Увійти в акаунт
          </router-link>
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
        <div>
          <label for="register-email" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email адреса</label>
          <input id="register-email" name="email" type="email" autocomplete="email" required v-model="email"
                 class="appearance-none block w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-blue-500 dark:focus:ring-indigo-500 focus:border-blue-500 dark:focus:border-indigo-500 sm:text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-50"
                 placeholder="you@example.com">
        </div>

        <div>
          <label for="register-password" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Пароль</label>
          <input id="register-password" name="password" type="password" autocomplete="new-password" required v-model="password"
                 class="appearance-none block w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-blue-500 dark:focus:ring-indigo-500 focus:border-blue-500 dark:focus:border-indigo-500 sm:text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-50"
                 placeholder="Мінімум 8 символів">
        </div>

        <div>
          <label for="confirm-password" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Підтвердіть пароль</label>
          <input id="confirm-password" name="confirm-password" type="password" autocomplete="new-password" required v-model="confirmPassword"
                 class="appearance-none block w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-blue-500 dark:focus:ring-indigo-500 focus:border-blue-500 dark:focus:border-indigo-500 sm:text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-50"
                 placeholder="Повторіть пароль">
        </div>

        <div>
          <BaseButton type="submit" variant="primary" size="lg" :block="true" :loading="isLoading" :disabled="!termsAgreed">
            Зареєструватися
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
const confirmPassword = ref('');
const termsAgreed = ref(false);
const isLoading = ref(false);
const errorMsg = ref('');

const handleRegister = async () => {
  if (!termsAgreed.value) {
    errorMsg.value = 'Будь ласка, погодьтеся з умовами використання.';
    return;
  }
  if (password.value !== confirmPassword.value) {
    errorMsg.value = 'Паролі не співпадають.';
    return;
  }
  isLoading.value = true;
  errorMsg.value = '';
  await new Promise(resolve => setTimeout(resolve, 1500));
  alert('Акаунт успішно створено! (Імітація). Тепер ви можете увійти.');
  router.push('/login');
  isLoading.value = false;
}
</script>