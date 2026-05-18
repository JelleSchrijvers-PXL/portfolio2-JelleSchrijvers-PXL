<script setup>
import { onMounted } from 'vue'
import Workpreviews from '@/components/workpreviews.vue';

defineOptions({ name: 'WorkPage' })

onMounted(() => {
  const sections = document.querySelectorAll('section')

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    },
    { threshold: 0.1 }
  )

  sections.forEach((section) => observer.observe(section))
})
</script>

<template>
    <Workpreviews />
</template>

<style scoped>

</style>
