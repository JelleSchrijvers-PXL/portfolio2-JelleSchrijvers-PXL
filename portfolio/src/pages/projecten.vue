<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const router = useRouter()
const { tm } = useI18n()

const img = (bestand) =>
  new URL(`../assets/foto/${bestand}`, import.meta.url).href

const project = computed(() => {
  const id = route.params.id
  const all = [
    ...tm('workPage.opdrachten'),
    ...tm('workPage.pes')
  ]
  const found = all.find(item => item.id === id)
  if (!found) return null
  return {
    ...found,
    image: img(found.image)
  }
})
</script>

<template>
  <div class="project-page">
    <button @click="router.push({ name: 'work' })">← Terug</button>

    <div v-if="project">
      <div class="project-header">
        <h1>{{ project.pageInfo.containerTitle.h1 }}</h1>
        <h2>{{ project.pageInfo.containerTitle.h2 }}</h2>
        <img :src="project.image" :alt="project.alt" />
      </div>

      <section
        v-for="(section, key) in {
          beschrijving: project.pageInfo.descprition,
          uitdagingen: project.pageInfo.personalChallenges,
          bijgeleerd: project.pageInfo.bijgeleerd
        }"
        :key="key"
        :id="section.id"
        class="project-section"
      >
        <h3>{{ section.h3 }}</h3>
        <p v-if="section.p">{{ section.p }}</p>
      </section>
    </div>

    <div v-else>
      <p>Project niet gevonden.</p>
    </div>
  </div>
</template>