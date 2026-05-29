<script setup>
import { ref } from 'vue'
import Overmij from '@/components/overmij.vue'
import Ontwikkeling from '@/components/ontwikkeling.vue'
import Logboek from '@/components/logboek.vue';

defineOptions({ name: 'InfoPage' })

const activeSemester = ref('semester1')
</script>

<template>
  <Overmij />
  <Logboek v-model="activeSemester" />
  <Ontwikkeling :active-semester="activeSemester" />
</template>

<style scoped>

</style>
