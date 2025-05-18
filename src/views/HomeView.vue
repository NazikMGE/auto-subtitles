<template>
  <div>
    <HeroSection />
    <HowItWorksSection v-if="!isLoggedIn" />
    <FeaturedProjectsSection v-else />
    <BenefitsSection />
    <CallToActionSection />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import HeroSection from '../components/home/HeroSection.vue';
import HowItWorksSection from '../components/home/HowItWorksSection.vue';
import BenefitsSection from '../components/home/BenefitsSection.vue';
import CallToActionSection from '../components/home/CallToActionSection.vue';
import FeaturedProjectsSection from '../components/home/FeaturedProjectsSection.vue';

const authStore = useAuthStore();
const router = useRouter();

// Визначаємо, чи авторизований користувач
const isLoggedIn = computed(() => authStore.isAuthenticated);
const userName = computed(() => {
  if (authStore.user?.full_name) return authStore.user.full_name;
  if (authStore.user?.name) return authStore.user.name;
  if (authStore.user?.email) return authStore.user.email.split('@')[0];
  return 'користувач';
});

// onMounted(() => {
//   if (isLoggedIn.value && router.hasRoute('dashboard')) {
//     router.push('/dashboard');
//   }
// });
</script>