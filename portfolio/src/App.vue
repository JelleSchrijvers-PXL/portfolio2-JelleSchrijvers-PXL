<script setup lang="ts">
import { computed, nextTick, watch } from 'vue';
import { useRoute } from 'vue-router';
import Footer from './components/footer.vue';
import Navbar from './components/navbar.vue';
import Sidenav from './components/sidenav.vue';

const route = useRoute();

const hasSideNav = computed(() => route.name === 'info' || route.name === 'work');
const activeWpl = computed(() => (route.query.wpl === 'wpl2' ? 'wpl2' : 'wpl1'));

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

<style scoped>
.layout {
  display: flex;
  padding-top: var(--header-height);
  min-height: 100vh;
}

.main-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: 0 2rem 2.5rem;
}

.layout--with-sidenav .main-wrapper {
  margin-left: var(--sidenav-width);
}

router-view {
  flex: 1;
}

@media (max-width: 980px) {
  .layout {
    padding-top: 0;
  }

  .main-wrapper {
    margin-left: 0;
    padding: 0 1rem 2rem;
  }

  .layout--with-sidenav .main-wrapper {
    margin-left: 0;
  }
}
</style>
