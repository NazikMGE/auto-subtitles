<template>
  <footer class="bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
    <div class="main-container py-12 md:py-16">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
        <div>
          <h5 class="text-sm font-semibold text-slate-900 dark:text-slate-200 tracking-wider uppercase mb-4">Продукт</h5>
          <ul class="space-y-3">
            <li><a href="/#how-it-works" class="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-indigo-400 transition-colors text-sm">Як це працює</a></li>
            <li><a href="#" class="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-indigo-400 transition-colors text-sm">Тарифи</a></li>
            <li><a href="#" class="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-indigo-400 transition-colors text-sm">Оновлення</a></li>
          </ul>
        </div>
        <div>
          <h5 class="text-sm font-semibold text-slate-900 dark:text-slate-200 tracking-wider uppercase mb-4">Компанія</h5>
          <ul class="space-y-3">
            <li><a href="#" class="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-indigo-400 transition-colors text-sm">Про нас</a></li>
            <li><a href="#" class="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-indigo-400 transition-colors text-sm">Блог</a></li>
            <li><a href="#" class="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-indigo-400 transition-colors text-sm">Контакти</a></li>
          </ul>
        </div>
        <div>
          <h5 class="text-sm font-semibold text-slate-900 dark:text-slate-200 tracking-wider uppercase mb-4">Ресурси</h5>
          <ul class="space-y-3">
            <li><a href="#" class="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-indigo-400 transition-colors text-sm">Документація</a></li>
            <li><a href="#" class="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-indigo-400 transition-colors text-sm">Підтримка</a></li>
            <li><a href="#" class="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-indigo-400 transition-colors text-sm">API Статус</a></li>
          </ul>
        </div>
        <div>
          <h5 class="text-sm font-semibold text-slate-900 dark:text-slate-200 tracking-wider uppercase mb-4">Правова Інформація</h5>
          <ul class="space-y-3">
            <li><a href="#" class="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-indigo-400 transition-colors text-sm">Умови використання</a></li>
            <li><a href="#" class="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-indigo-400 transition-colors text-sm">Політика конфіденційності</a></li>
            <li><a href="#" class="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-indigo-400 transition-colors text-sm">Ліцензії</a></li>
          </ul>
        </div>
      </div>

      <div class="mt-10 pt-8 border-t border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row justify-between items-center">
        <p class="text-sm text-slate-500 dark:text-slate-400">
          &copy; {{ new Date().getFullYear() }} AutoSubtitles. Всі права захищені.
        </p>
        <div class="flex space-x-5 mt-4 sm:mt-0">
          <a href="#" class="text-slate-400 hover:text-slate-500 dark:hover:text-slate-300">
            <span class="sr-only">Facebook</span>
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" /></svg>
          </a>
          <a href="#" class="text-slate-400 hover:text-slate-500 dark:hover:text-slate-300">
            <span class="sr-only">Twitter</span>
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
          </a>
          </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Footer logic
</script>