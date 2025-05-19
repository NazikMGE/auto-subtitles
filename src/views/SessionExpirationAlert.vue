<!-- src/components/SessionExpirationAlert.vue -->
<template>
  <div 
    v-if="showAlert"
    class="fixed top-0 left-0 right-0 z-[200] bg-amber-500 text-white py-3 px-4 flex items-center justify-between shadow-lg animate-slide-down"
  >
    <div class="flex items-center">
      <ExclamationTriangleIcon class="h-5 w-5 mr-2 text-white" aria-hidden="true" />
      <span class="text-sm font-medium">{{ alertMessage }}</span>
    </div>
    <button 
      @click="closeAlert"
      class="text-white hover:text-amber-200 focus:outline-none"
    >
      <XMarkIcon class="h-5 w-5" aria-hidden="true" />
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/vue/24/outline';

const authStore = useAuthStore();
const router = useRouter();
const showAlert = ref(false);

// Визначаємо повідомлення в залежності від причини закінчення сесії
const alertMessage = computed(() => {
  const reason = authStore.sessionExpiredReason;
  
  switch (reason) {
    case 'token_expired':
      return 'Термін дії вашої сесії закінчився через неактивність. Будь ласка, увійдіть знову.';
    case 'invalid_token':
      return 'Ваш сеанс було перервано з міркувань безпеки. Будь ласка, увійдіть знову.';
    case 'manual_logout':
      return 'Ви успішно вийшли з системи.';
    default:
      return 'Ваша сесія закінчилася. Будь ласка, увійдіть знову.';
  }
});

// Відображаємо сповіщення, якщо є причина закінчення сесії
watch(() => authStore.sessionExpiredReason, (newValue) => {
  if (newValue) {
    showAlert.value = true;
  }
});

// Також перевіряємо URL параметри при монтуванні компонента
onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('message') === 'session_expired') {
    showAlert.value = true;
    authStore.sessionExpiredReason = 'token_expired';
  }
});

// Закриваємо сповіщення
function closeAlert() {
  showAlert.value = false;
  authStore.clearSessionExpiredReason();
  
  // Якщо ми на сторінці входу, видаляємо параметр message з URL
  if (router.currentRoute.value.path === '/login' && router.currentRoute.value.query.message) {
    const query = { ...router.currentRoute.value.query };
    delete query.message;
    router.replace({ query });
  }
}
</script>

<style scoped>
@keyframes slide-down {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}

.animate-slide-down {
  animation: slide-down 0.3s ease-out forwards;
}
</style>