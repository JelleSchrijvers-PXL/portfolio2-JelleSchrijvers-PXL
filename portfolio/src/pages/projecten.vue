<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

defineOptions({ name: 'ProjectDetailPage' })

const route = useRoute()
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
    <RouterLink :to="{ name: 'work' }" class="back-button">← Terug</RouterLink>

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

<style scoped>
.project-page {
  padding: 2rem;
}

.back-button {
  display: inline-flex;
  align-items: center;
  margin-bottom: 1.5rem;
  color: #38bdf8;
  font-weight: 600;
  text-decoration: none;
}

.back-button:hover {
  color: #7dd3fc;
}
</style>
