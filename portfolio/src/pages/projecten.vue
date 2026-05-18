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
  max-width: 1000px;
  margin: 0 auto;
  padding: 2.5rem 0 4rem;
  color: var(--color-text);
}

.back-button {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 1.5rem;
  padding: 0.65rem 0.9rem;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  background: rgba(17, 24, 39, 0.72);
  color: var(--color-accent);
  font-weight: 750;
  text-decoration: none;
  transition:
    border-color 0.2s ease,
    background 0.2s ease,
    transform 0.2s ease;
}

.back-button:hover {
  border-color: var(--color-border-hover);
  background: var(--color-accent-soft);
  transform: translateX(-2px);
}

.project-header {
  display: grid;
  gap: 0.75rem;
  margin-bottom: 2.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--color-border);
}

.project-header h1 {
  color: var(--color-heading);
  font-size: 3.2rem;
  font-weight: 850;
  line-height: 1.05;
}

.project-header h2 {
  color: var(--color-text-muted);
  font-size: 1rem;
  font-weight: 700;
}

.project-header img {
  width: 100%;
  max-height: 460px;
  margin-top: 1rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  object-fit: cover;
  box-shadow: var(--shadow-soft);
}

.project-section {
  padding: 2rem 0;
  border-top: 1px solid rgba(148, 163, 184, 0.14);
  scroll-margin-top: 110px;
}

.project-section h3 {
  margin-bottom: 0.75rem;
  color: var(--color-heading);
  font-size: 1.25rem;
  font-weight: 800;
}

.project-section p {
  max-width: 820px;
  color: var(--color-text);
  line-height: 1.8;
}

@media (max-width: 760px) {
  .project-header h1 {
    font-size: 2.2rem;
  }
}
</style>
