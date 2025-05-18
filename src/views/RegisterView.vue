<template>
  <div class="min-h-screen flex flex-col items-center justify-center overflow-hidden relative">
    <!-- Інтерактивний фон з градієнтами -->
    <div class="absolute inset-0 z-0 bg-gradient-to-br from-blue-700 via-indigo-900 to-purple-900 dark:from-blue-900 dark:via-indigo-950 dark:to-purple-950 overflow-hidden">
      <!-- Анімовані кола -->
      <div class="absolute -top-60 -left-60 w-[40rem] h-[40rem] bg-pink-500/20 rounded-full blur-3xl animate-blob"></div>
      <div class="absolute top-0 -right-24 w-[30rem] h-[30rem] bg-yellow-500/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      <div class="absolute bottom-0 left-20 w-[35rem] h-[35rem] bg-blue-500/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      
      <!-- Декоративна решітка -->
      <div class="absolute inset-0 bg-grid-white/[0.05] bg-[length:50px_50px]"></div>
      
      <!-- Додатковий ефект світіння внизу -->
      <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent blur-sm"></div>
      <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-indigo-400 to-transparent blur-sm"></div>
    </div>

    <!-- Основний контент -->
    <div class="container relative z-10 px-5 py-6 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 max-w-6xl mx-auto">
      <!-- Ліва частина: брендинг і заголовки - прихована на мобільних -->
      <div class="hidden lg:block lg:w-1/2 text-left">
        <div class="flex justify-start mb-6">
          <router-link to="/" class="inline-flex items-center transition-transform duration-300 hover:scale-105 focus:outline-none">
            <img :src="logoUrl" alt="AutoSubtitles Logo" class="h-12 w-auto mr-3" />
            <span class="text-3xl font-extrabold tracking-tight text-white drop-shadow-lg">
              <span>Auto</span><span class="text-yellow-400">Subtitles</span>
            </span>
          </router-link>
        </div>
        
        <h1 class="text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-md">Приєднуйтеся <br class="hidden lg:block" /> до <span class="text-yellow-400">революції</span> в субтитрах</h1>
        
        <p class="text-lg text-blue-100 mb-6 max-w-md opacity-90">
          Зареєструйтесь зараз і отримайте доступ до найсучаснішої технології автоматичного створення субтитрів.
        </p>
        
        <!-- Переваги реєстрації -->
        <div class="space-y-3 mb-5 max-w-md">
          <div class="flex items-center text-white gap-2">
            <SparklesIcon class="h-5 w-5 text-yellow-400 flex-shrink-0" />
            <span>Безкоштовна пробна версія для нових користувачів</span>
          </div>
          <div class="flex items-center text-white gap-2">
            <CloudArrowUpIcon class="h-5 w-5 text-yellow-400 flex-shrink-0" />
            <span>Зберігання та організація ваших проектів</span>
          </div>
          <div class="flex items-center text-white gap-2">
            <UsersIcon class="h-5 w-5 text-yellow-400 flex-shrink-0" />
            <span>Доступ до спільноти професіоналів</span>
          </div>
        </div>
      </div>
      
      <!-- Права частина: форма реєстрації -->
      <div class="w-full max-w-md lg:w-1/2">
        <div class="modern-card p-8 rounded-2xl shadow-2xl transition-all duration-300 transform hover:shadow-yellow-400/10">
          <!-- Логотип для мобільних пристроїв -->
          <div class="flex justify-center mb-6 lg:hidden">
            <router-link to="/" class="inline-flex items-center transition-transform duration-300 hover:scale-105 focus:outline-none">
              <img :src="logoUrl" alt="AutoSubtitles Logo" class="h-10 w-auto mr-2" />
              <span class="text-2xl font-extrabold tracking-tight text-white drop-shadow-lg">
                <span>Auto</span><span class="text-yellow-400">Subtitles</span>
              </span>
            </router-link>
          </div>
          <!-- Верхня частина форми -->
          <div class="text-center mb-6">
            <h2 class="text-2xl font-bold text-white">
              Створіть новий акаунт
            </h2>
            <p class="text-blue-100 text-sm mt-1">
              Почніть використовувати AutoSubtitles вже сьогодні
            </p>
          </div>
          
          <form class="space-y-5" @submit.prevent="handleRegister">
            <!-- Email поле -->
            <div>
              <label for="register-email" class="block text-sm font-medium text-blue-100 mb-2">
                Email адреса
              </label>
                              <div class="relative">
                <div class="absolute inset-y-0 left-3 flex items-center pointer-events-none z-10">
                  <AtSymbolIcon class="h-5 w-5 text-white/70" aria-hidden="true" />
                </div>
                <input 
                  id="register-email" 
                  name="email" 
                  type="email" 
                  autocomplete="email" 
                  required 
                  v-model="email"
                  class="input-with-icon pl-10 pr-4 py-3 w-full rounded-xl border-2 border-white/10 bg-white/10 text-white placeholder-blue-200/70 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/50 transition-all duration-200"
                  :class="{'border-red-500 focus:border-red-500 focus:ring-red-500/50': formErrors.email}"
                  placeholder="ви@приклад.com"
                >
                <p v-if="formErrors.email" class="text-red-400 text-xs mt-1">{{ formErrors.email }}</p>
              </div>
            </div>

            <!-- Пароль поле -->
            <div>
              <label for="register-password" class="block text-sm font-medium text-blue-100 mb-2">
                Пароль
              </label>
                              <div class="relative">
                <div class="absolute inset-y-0 left-3 flex items-center pointer-events-none z-10">
                  <LockClosedIcon class="h-5 w-5 text-white/70" aria-hidden="true" />
                </div>
                <input 
                  id="register-password" 
                  name="password" 
                  :type="showPassword ? 'text' : 'password'" 
                  autocomplete="new-password" 
                  required 
                  v-model="password"
                  class="input-with-icon pl-10 pr-10 py-3 w-full rounded-xl border-2 border-white/10 bg-white/10 text-white placeholder-blue-200/70 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/50 transition-all duration-200"
                  :class="{'border-red-500 focus:border-red-500 focus:ring-red-500/50': formErrors.password}"
                  placeholder="Мінімум 8 символів"
                >
                <button 
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute inset-y-0 right-3 flex items-center text-white/70 hover:text-yellow-400 focus:outline-none transition-colors duration-200 z-10"
                >
                  <EyeIcon v-if="showPassword" class="h-5 w-5" aria-hidden="true" />
                  <EyeSlashIcon v-else class="h-5 w-5" aria-hidden="true" />
                </button>
                <p v-if="formErrors.password" class="text-red-400 text-xs mt-1">{{ formErrors.password }}</p>
              </div>
              
              <!-- Індикатор сили пароля -->
              <div class="mt-2">
                <div class="flex items-center space-x-1">
                  <div 
                    v-for="strength in 4" 
                    :key="strength"
                    :class="[
                      'h-1 rounded-full flex-1 transition-all duration-300',
                      passwordStrength >= strength 
                        ? 'bg-green-500 dark:bg-green-600' 
                        : 'bg-white/10 dark:bg-white/5'
                    ]"
                  ></div>
                </div>
                <p class="text-xs text-blue-200 mt-1">
                  {{ passwordStrengthText }}
                </p>
              </div>
            </div>

            <!-- Підтвердження пароля -->
            <div>
              <label for="confirm-password" class="block text-sm font-medium text-blue-100 mb-2">
                Підтвердіть пароль
              </label>
                              <div class="relative">
                <div class="absolute inset-y-0 left-3 flex items-center pointer-events-none z-10">
                  <ShieldCheckIcon class="h-5 w-5 text-white/70" aria-hidden="true" />
                </div>
                <input 
                  id="confirm-password" 
                  name="confirm-password" 
                  :type="showPassword ? 'text' : 'password'" 
                  autocomplete="new-password" 
                  required 
                  v-model="confirmPassword"
                  class="input-with-icon pl-10 pr-4 py-3 w-full rounded-xl border-2 border-white/10 bg-white/10 text-white placeholder-blue-200/70 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/50 transition-all duration-200"
                  :class="{'border-red-500 focus:border-red-500 focus:ring-red-500/50': formErrors.confirmPassword}"
                  placeholder="Повторіть пароль"
                >
                <p v-if="formErrors.confirmPassword" class="text-red-400 text-xs mt-1">{{ formErrors.confirmPassword }}</p>
              </div>
            </div>

            <!-- Повідомлення про помилку -->
            <div 
              v-if="errorMsg" 
              class="flex items-center p-3 bg-red-500/10 border border-red-500/30 rounded-xl animate-fade-in"
            >
              <ExclamationCircleIcon class="h-5 w-5 mr-2 text-red-400" aria-hidden="true" />
              <span class="text-sm text-red-100">{{ errorMsg }}</span>
            </div>

            <!-- Кнопка реєстрації -->
            <button 
              type="submit" 
              :disabled="isLoading"
              class="w-full mt-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium py-3 px-6 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 shadow-lg shadow-blue-700/20 hover:shadow-blue-700/30 flex items-center justify-center group relative overflow-hidden"
            >
              <span class="absolute right-full w-12 h-32 -mt-8 bg-white/20 -rotate-12 transform group-hover:translate-x-[650%] ease-out transition-transform duration-1000"></span>
              
              <UserPlusIcon 
                v-if="!isLoading" 
                class="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-300" 
                aria-hidden="true" 
              />
              <svg v-if="isLoading" class="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{{ isLoading ? 'Створення акаунту...' : 'Створити акаунт' }}</span>
            </button>
          </form>

          <!-- Розділювач -->
          <div class="relative flex items-center justify-center my-6">
            <div class="w-full border-t border-white/10"></div>
            <div class="px-3 text-xs text-blue-200 bg-transparent whitespace-nowrap">або</div>
            <div class="w-full border-t border-white/10"></div>
          </div>

          <!-- Вхід -->
          <div class="text-center">
            <p class="text-sm text-blue-100">
              Вже маєте акаунт?
              <router-link to="/login" class="font-medium text-blue-300 hover:text-yellow-400 transition-colors duration-200 ml-1 animated-link">
                Увійти зараз
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import logoUrl from '@/assets/logo.svg';

// Імпорт іконок з Heroicons
import { 
  AtSymbolIcon, 
  LockClosedIcon, 
  ShieldCheckIcon,
  UserPlusIcon,
  ExclamationCircleIcon,
  EyeIcon,
  EyeSlashIcon,
  SparklesIcon,
  CloudArrowUpIcon,
  UsersIcon
} from '@heroicons/vue/24/outline';

const router = useRouter();
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const isLoading = ref(false);
const errorMsg = ref('');
const showPassword = ref(false);
const formErrors = ref({
  email: '',
  password: '',
  confirmPassword: ''
});

// Функції для реєстрації
const passwordStrength = computed(() => {
  if (!password.value) return 0;
  
  let strength = 0;
  
  // Довжина пароля
  if (password.value.length >= 8) strength += 1;
  if (password.value.length >= 12) strength += 1;
  
  // Наявність різних типів символів
  if (/[A-Z]/.test(password.value)) strength += 0.5;
  if (/[a-z]/.test(password.value)) strength += 0.5;
  if (/[0-9]/.test(password.value)) strength += 0.5;
  if (/[^A-Za-z0-9]/.test(password.value)) strength += 0.5;
  
  // Обмежуємо максимальне значення до 4
  return Math.min(Math.floor(strength), 4);
});

// Текстовий опис сили пароля
const passwordStrengthText = computed(() => {
  if (!password.value) return 'Введіть пароль';
  
  switch(passwordStrength.value) {
    case 0: return 'Дуже слабкий пароль';
    case 1: return 'Слабкий пароль - додайте цифри і спеціальні символи';
    case 2: return 'Середній пароль - додайте більше різних символів';
    case 3: return 'Хороший пароль';
    case 4: return 'Надійний пароль';
    default: return '';
  }
});

// Очищення помилок при зміні значень полів
watch([email, password, confirmPassword], () => {
  errorMsg.value = '';
  formErrors.value = {
    email: '',
    password: '',
    confirmPassword: ''
  };
});

// Валідація форми
const validateForm = () => {
  let isValid = true;
  formErrors.value = {
    email: '',
    password: '',
    confirmPassword: ''
  };
  
  // Валідація email
  if (!email.value) {
    formErrors.value.email = 'Email обов\'язковий';
    isValid = false;
  } else if (!/^\S+@\S+\.\S+$/.test(email.value)) {
    formErrors.value.email = 'Введіть коректний email';
    isValid = false;
  }
  
  // Валідація пароля
  if (!password.value) {
    formErrors.value.password = 'Пароль обов\'язковий';
    isValid = false;
  } else if (password.value.length < 8) {
    formErrors.value.password = 'Пароль має бути не менше 8 символів';
    isValid = false;
  } else if (passwordStrength.value < 2) {
    formErrors.value.password = 'Пароль надто простий. Додайте цифри та спеціальні символи';
    isValid = false;
  }
  
  // Перевірка співпадіння паролів
  if (password.value !== confirmPassword.value) {
    formErrors.value.confirmPassword = 'Паролі не співпадають';
    isValid = false;
  }
  
  return isValid;
};

// Обробник реєстрації
const handleRegister = async () => {
  if (!validateForm()) return;
  
  isLoading.value = true;
  errorMsg.value = '';
  
  try {
    // Імітація запиту до сервера
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Успішна реєстрація - перенаправлення на сторінку входу
    router.push('/login');
  } catch (error) {
    errorMsg.value = 'Помилка сервера. Спробуйте пізніше.';
    console.error('Помилка реєстрації:', error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes blob {
  0% { transform: scale(1) translate(0px, 0px); }
  33% { transform: scale(1.1) translate(30px, -50px); }
  66% { transform: scale(0.9) translate(-20px, 20px); }
  100% { transform: scale(1) translate(0px, 0px); }
}

/* Утиліти анімацій */
.animate-blob {
  animation: blob 7s infinite;
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

/* Карточка та інпути */
.modern-card {
  background: rgba(30, 58, 138, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.input-with-icon {
  background-color: rgba(30, 41, 59, 0.5);
}

.input-with-icon:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.3), 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Анімація посилання */
.animated-link {
  position: relative;
}

.animated-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 1px;
  bottom: -1px;
  left: 0;
  background-color: #FACC15;
  transition: width 0.3s ease-in-out;
}

.animated-link:hover::after {
  width: 100%;
}

/* Мобільна адаптація */
@media (max-width: 640px) {
  .modern-card {
    padding: 1.5rem;
    border-radius: 1rem;
  }
}
</style>