<script setup lang="ts">
import Footer from './components/footer.vue';
import Navbar from './components/navbar.vue';
import Sidenav from './components/sidenav.vue';
</script>

<template>
  <Navbar />
  <div class="layout">
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
  padding-top: 80px; /* hoogte van je navbar */
  min-height: 100vh;
}

.main-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 220px; /* breedte van je sidenav */
}

router-view {
  flex: 1;
}
</style>