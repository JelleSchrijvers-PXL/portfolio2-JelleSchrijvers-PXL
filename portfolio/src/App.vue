<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Footer from './components/footer.vue';
import Navbar from './components/navbar.vue';
import Sidenav from './components/sidenav.vue';

const route = useRoute();

const hasSideNav = computed(() => route.name === 'info' || route.name === 'work');
</script>

<template>
  <Navbar />
  <div class="layout" :class="{ 'layout--with-sidenav': hasSideNav }">
    <Sidenav />
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
