<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

defineOptions({ name: 'ProjectDetailPage' })

const route = useRoute()
const { tm } = useI18n()

const img = (bestand) =>
  bestand ? new URL(`../assets/foto/${bestand}`, import.meta.url).href : null

const video = (bestand) =>
  bestand ? new URL(`../assets/videos/${bestand}`, import.meta.url).href : null

const videos = (items) =>
  Array.isArray(items)
    ? items.map((item) => ({
        ...item,
        src: video(item.file)
      }))
    : []

const infoImages = (items) =>
  Array.isArray(items)
    ? items.map((item) => ({
        ...item,
        src: img(item.file)
      }))
    : []

const labels = computed(() => tm('workPage.labels'))

const project = computed(() => {
  const id = route.params.id
  const all = [
    ...tm('workPage.opdrachten').map((item) => ({ ...item, wpl: 'wpl1' })),
    ...tm('workPage.pes').map((item) => ({ ...item, wpl: 'wpl1' })),
    { ...tm('workPage.wpl2Project'), wpl: 'wpl2' },
    ...tm('workPage.wpl2Opdrachten').map((item) => ({ ...item, wpl: 'wpl2' }))
  ]
  const found = all.find(item => item.id === id)
  if (!found) return null
  return {
    ...found,
    image: img(found.image),
    video: video(found.video),
    videos: videos(found.videos),
    infoImages: infoImages(found.infoImages)
  }
})

const backToWork = computed(() => ({
  name: 'work',
  query: {
    wpl: project.value?.wpl || (route.query.wpl === 'wpl2' ? 'wpl2' : 'wpl1')
  }
}))

const projectSections = computed(() => {
  if (!project.value) return []

  if (Array.isArray(project.value.pageInfo.sections)) {
    return project.value.pageInfo.sections
  }

  return [
    project.value.pageInfo.descprition,
    project.value.pageInfo.personalChallenges,
    project.value.pageInfo.bijgeleerd
  ].filter(Boolean)
})

const itemKey = (item) =>
  typeof item === 'string' ? item : `${item.label || item.title}-${item.text || item.href || ''}`
</script>

<template>
  <div class="project-page">
    <RouterLink :to="backToWork" class="back-button">← {{ labels.back }}</RouterLink>

    <div v-if="project">
      <div class="project-header">
        <div v-if="project.badges?.length" class="badges">
          <span
            v-for="badge in project.badges"
            :key="badge"
            class="badge"
          >
            {{ badge }}
          </span>
        </div>
        <h1>{{ project.pageInfo.containerTitle.h1 }}</h1>
        <h2>{{ project.pageInfo.containerTitle.h2 }}</h2>
        <p v-if="project.summary" class="project-summary">{{ project.summary }}</p>
        <div v-if="project.links?.length" class="project-links">
          <a
            v-for="link in project.links"
            :key="link.href"
            :href="link.href"
            target="_blank"
            rel="noreferrer"
          >
            {{ link.label }}
          </a>
        </div>
        <img v-if="project.image" :src="project.image" :alt="project.alt" />
      </div>

      <section
        v-if="project.video"
        id="demo"
        class="project-section media-section"
      >
        <h3>{{ project.videoTitle || labels.demoVideo }}</h3>
        <p v-if="project.videoDescription">{{ project.videoDescription }}</p>
        <video controls preload="metadata">
          <source :src="project.video" type="video/mp4">
        </video>
      </section>

      <section
        v-if="project.videos?.length"
        id="demos"
        class="project-section media-section"
      >
        <h3>{{ project.videosTitle || labels.demoVideos }}</h3>
        <p v-if="project.videosDescription">{{ project.videosDescription }}</p>
        <div class="video-grid">
          <article
            v-for="item in project.videos"
            :key="item.file"
            class="video-card"
          >
            <h4>{{ item.title }}</h4>
            <p v-if="item.description">{{ item.description }}</p>
            <video controls preload="metadata">
              <source :src="item.src" type="video/mp4">
            </video>
          </article>
        </div>
      </section>

      <section
        v-if="project.infoImages?.length"
        id="bewijsmateriaal"
        class="project-section evidence-section"
      >
        <h3>{{ project.infoImagesTitle || labels.evidence }}</h3>
        <p v-if="project.infoImagesDescription">{{ project.infoImagesDescription }}</p>
        <div class="evidence-grid">
          <article
            v-for="item in project.infoImages"
            :key="item.file"
            class="evidence-card"
          >
            <img :src="item.src" :alt="item.alt" />
            <div>
              <h4>{{ item.title }}</h4>
              <p v-if="item.description">{{ item.description }}</p>
            </div>
          </article>
        </div>
      </section>

      <section
        v-for="section in projectSections"
        :key="section.id"
        :id="section.id"
        class="project-section"
      >
        <h3>{{ section.h3 }}</h3>
        <p v-if="section.p">{{ section.p }}</p>
        <ul v-if="section.items?.length" class="section-list">
          <li
            v-for="item in section.items"
            :key="itemKey(item)"
          >
            <template v-if="typeof item === 'string'">
              {{ item }}
            </template>
            <template v-else>
              <strong v-if="item.label">{{ item.label }}</strong>
              {{ item.text }}
            </template>
          </li>
        </ul>
        <p v-if="section.outro">{{ section.outro }}</p>
      </section>

      <section
        v-if="project.technologies?.length"
        id="technologieen"
        class="project-section"
      >
        <h3>{{ labels.technologies }}</h3>
        <div class="tech-list">
          <span
            v-for="tech in project.technologies"
            :key="tech"
          >
            {{ tech }}
          </span>
        </div>
      </section>

      <section
        v-if="project.installation"
        id="installatie"
        class="project-section install-section"
      >
        <h3>{{ project.installation.h3 || labels.installation }}</h3>
        <p v-if="project.installation.note" class="install-note">
          {{ project.installation.note }}
        </p>
        <div
          v-if="project.installation.commands?.length"
          class="command-list"
        >
          <code
            v-for="command in project.installation.commands"
            :key="command"
          >
            {{ command }}
          </code>
        </div>
        <h4 v-if="project.installation.requirements?.length">
          {{ project.installation.requirementsTitle || labels.requirements }}
        </h4>
        <ul
          v-if="project.installation.requirements?.length"
          class="section-list"
        >
          <li
            v-for="requirement in project.installation.requirements"
            :key="requirement"
          >
            {{ requirement }}
          </li>
        </ul>
      </section>
    </div>

    <div v-else>
      <p>{{ labels.notFound }}</p>
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

.project-summary {
  max-width: 820px;
  color: var(--color-text);
  font-size: 1.05rem;
  line-height: 1.7;
}

.project-header img {
  width: 100%;
  max-height: 460px;
  margin-top: 1rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  object-fit: contain;
  background: #f8fafc;
  box-shadow: var(--shadow-soft);
}

.media-section video {
  width: 100%;
  max-width: 920px;
  margin-top: 1rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: rgba(2, 6, 23, 0.82);
  box-shadow: var(--shadow-soft);
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.video-card {
  display: grid;
  gap: 0.45rem;
  padding: 1rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: rgba(17, 24, 39, 0.72);
}

.video-card h4 {
  color: var(--color-heading);
  font-size: 1rem;
  font-weight: 850;
}

.video-card p {
  color: var(--color-text-muted);
  font-size: 0.94rem;
  line-height: 1.55;
}

.video-card video {
  max-width: none;
  margin-top: 0.35rem;
}

.evidence-grid {
  display: grid;
  gap: 1rem;
  margin-top: 1rem;
}

.evidence-card {
  display: grid;
  gap: 0.85rem;
  padding: 1rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: rgba(17, 24, 39, 0.72);
}

.evidence-card img {
  width: 100%;
  max-height: 420px;
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 6px;
  object-fit: contain;
  background: #ffffff;
}

.evidence-card h4 {
  color: var(--color-heading);
  font-size: 1rem;
  font-weight: 850;
}

.evidence-card p {
  color: var(--color-text-muted);
  font-size: 0.94rem;
  line-height: 1.6;
}

.badges,
.project-links,
.tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.badge,
.tech-list span,
.project-links a {
  display: inline-flex;
  align-items: center;
  min-height: 32px;
  padding: 0.35rem 0.6rem;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 800;
}

.badge {
  color: var(--color-accent);
}

.project-links a {
  background: var(--color-accent-soft);
  color: var(--color-accent);
  text-decoration: none;
}

.project-links a:hover {
  border-color: var(--color-border-hover);
  color: var(--color-heading);
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

.section-list {
  display: grid;
  gap: 0.65rem;
  max-width: 820px;
  margin: 0.75rem 0 1rem;
  padding-left: 1.25rem;
  color: var(--color-text);
  line-height: 1.75;
}

.section-list strong {
  color: var(--color-heading);
  font-weight: 800;
}

.tech-list span {
  color: var(--color-heading);
}

.install-note {
  padding: 1rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: rgba(56, 189, 248, 0.08);
}

.command-list {
  display: grid;
  gap: 0.6rem;
  max-width: 820px;
  margin: 1rem 0;
}

.command-list code {
  display: block;
  padding: 0.75rem 0.9rem;
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 8px;
  background: rgba(2, 6, 23, 0.82);
  color: var(--color-heading);
  white-space: pre-wrap;
}

.install-section h4 {
  margin-top: 1.25rem;
  color: var(--color-heading);
  font-size: 1rem;
  font-weight: 800;
}

@media (max-width: 760px) {
  .project-header h1 {
    font-size: 2.2rem;
  }
}
</style>
