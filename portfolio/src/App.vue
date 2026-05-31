<script setup lang="ts">
import { computed, nextTick, watch } from 'vue';
import { useRoute } from 'vue-router';
import Footer from './components/footer.vue';
import Navbar from './components/navbar.vue';
import Sidenav from './components/sidenav.vue';

const route = useRoute();

const hasSideNav = computed(() => route.name === 'info' || route.name === 'work');
const activeWpl = computed(() => {
  if (route.query.wpl === 'wpl2') return 'wpl2';
  if (route.query.wpl === 'personal') return 'personal';
  return 'wpl1';
});

watch(
  () => route.fullPath,
  async () => {
    await nextTick();
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }
);
</script>

<template>
  <Navbar />
  <div class="layout" :class="{ 'layout--with-sidenav': hasSideNav }">
    <Sidenav :active-wpl="activeWpl" />
    <div class="main-wrapper">
      <router-view />
      <Footer />
    </div>
  </div>
</template>
