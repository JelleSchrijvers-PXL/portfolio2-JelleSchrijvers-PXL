<script setup lang="ts">
import Footer from './components/footer.vue';
import Navbar from './components/navbar.vue';
import Sidenav from './components/sidenav.vue';

</script>

<template>
  <Navbar/>
  <router-view />
  <Sidenav/>
  <Footer/>
</template>