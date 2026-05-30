<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

defineOptions({ name: 'WorkPreviews' })

const { tm } = useI18n()
const route = useRoute()
const router = useRouter()

const img = (bestand) =>
  bestand ? new URL(`../assets/foto/${bestand}`, import.meta.url).href : null

const file = (bestand) =>
  new URL(`../assets/files/${bestand}`, import.meta.url).href

const labels = computed(() => tm('workPage.labels'))

const withImage = (item) => ({
  ...item,
  image: img(item.image)
})

const opdrachtenFixed = computed(() =>
  tm('workPage.opdrachten').map(withImage)
)

const pesFixed = computed(() =>
  tm('workPage.pes').map(withImage)
)

const wpl1ProjectIds = new Set(['scratch', 'CV', 'portfolio'])

const wpl1Opdrachten = computed(() =>
  opdrachtenFixed.value.filter((item) => !wpl1ProjectIds.has(item.id))
)

const wpl1Projecten = computed(() =>
  opdrachtenFixed.value.filter((item) => wpl1ProjectIds.has(item.id))
)

const wpl2Project = computed(() => withImage(tm('workPage.wpl2Project')))

const wpl2Opdrachten = computed(() =>
  tm('workPage.wpl2Opdrachten').map(withImage)
)

const wpl2Downloads = computed(() => tm('workPage.wpl2Downloads'))

const activeWpl = computed(() => (route.query.wpl === 'wpl2' ? 'wpl2' : 'wpl1'))

const setActiveWpl = (wpl) => {
  if (activeWpl.value === wpl) {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    return
  }

  router.push({
    name: 'work',
    query: {
      ...route.query,
      wpl
    }
  })
}
</script>

<template>
  <div class="container-work">
    <nav class="work-tabs" :aria-label="labels.workNavigation">
      <button
        type="button"
        class="work-tab"
        :class="{ active: activeWpl === 'wpl1' }"
        @click="setActiveWpl('wpl1')"
      >
        {{ labels.wpl1 }}
      </button>
      <button
        type="button"
        class="work-tab"
        :class="{ active: activeWpl === 'wpl2' }"
        @click="setActiveWpl('wpl2')"
      >
        {{ labels.wpl2 }}
      </button>
    </nav>

    <section
      v-if="activeWpl === 'wpl1'"
      id="wpl1"
      class="work-period"
    >
      <div class="period-header">
        <p class="period-kicker">{{ labels.wpl1 }}</p>
        <h2>{{ labels.opdrachten }}</h2>
        <p>{{ labels.wpl1Subtitle }}</p>
      </div>

      <div class="work-grid">
        <section v-for="item in wpl1Opdrachten" :key="item.id" :id="item.id">
          <router-link :to="{ name: 'project', params: { id: item.id }, query: { wpl: activeWpl } }">
            <article class="opdracht">
              <img v-if="item.image" :src="item.image" :alt="item.alt" />
              <h3>{{ item.title }}</h3>
            </article>
          </router-link>
        </section>
      </div>

      <div class="period-header period-header--sub">
        <h2>{{ labels.evaluations }}</h2>
      </div>

      <div class="work-grid">
        <section v-for="item in pesFixed" :key="item.id" :id="item.id">
          <router-link :to="{ name: 'project', params: { id: item.id }, query: { wpl: activeWpl } }">
            <article class="opdracht">
              <img v-if="item.image" :src="item.image" :alt="item.alt" />
              <h3>{{ item.title }}</h3>
            </article>
          </router-link>
        </section>
      </div>

      <div class="period-header period-header--sub">
        <h2>{{ labels.projects }}</h2>
      </div>

      <div class="work-grid">
        <section v-for="item in wpl1Projecten" :key="item.id" :id="item.id">
          <router-link :to="{ name: 'project', params: { id: item.id }, query: { wpl: activeWpl } }">
            <article class="opdracht">
              <img v-if="item.image" :src="item.image" :alt="item.alt" />
              <h3>{{ item.title }}</h3>
            </article>
          </router-link>
        </section>
      </div>
    </section>

    <section
      v-if="activeWpl === 'wpl2'"
      id="wpl2"
      class="work-period work-period--wpl2"
    >
      <div class="period-header">
        <p class="period-kicker">{{ labels.wpl2 }}</p>
        <h2>{{ labels.clockwise }}</h2>
        <p>{{ labels.wpl2Subtitle }}</p>
      </div>

      <section :id="wpl2Project.id" class="featured-project">
        <router-link :to="{ name: 'project', params: { id: wpl2Project.id }, query: { wpl: activeWpl } }">
          <article class="featured-card">
            <div class="card-visual card-visual--featured">
              <img
                v-if="wpl2Project.image"
                :src="wpl2Project.image"
                :alt="wpl2Project.alt"
              />
              <span v-else>Clockwise</span>
            </div>
            <div class="card-content">
              <div class="badges">
                <span
                  v-for="badge in wpl2Project.badges"
                  :key="badge"
                  class="badge"
                >
                  {{ badge }}
                </span>
              </div>
              <h3>{{ wpl2Project.title }}</h3>
              <p>{{ wpl2Project.summary }}</p>
              <span class="card-action">{{ labels.viewProject }}</span>
            </div>
          </article>
        </router-link>
      </section>

      <div class="period-header period-header--sub">
        <h2>{{ labels.wpl2Assignments }}</h2>
      </div>

      <div class="work-grid work-grid--wpl2">
        <section
          v-for="item in wpl2Opdrachten"
          :key="item.id"
          :id="item.id"
        >
          <router-link :to="{ name: 'project', params: { id: item.id }, query: { wpl: activeWpl } }">
            <article class="opdracht opdracht--wpl2">
              <img
                v-if="item.image"
                class="wpl2-preview-image"
                :src="item.image"
                :alt="item.alt"
              />
              <div v-else class="card-visual">
                <span>{{ item.title }}</span>
              </div>
              <div class="badges">
                <span
                  v-for="badge in item.badges"
                  :key="badge"
                  class="badge"
                >
                  {{ badge }}
                </span>
              </div>
              <h3>{{ item.title }}</h3>
              <p>{{ item.summary }}</p>
            </article>
          </router-link>
        </section>
      </div>

      <div class="period-header period-header--sub">
        <h2>{{ labels.downloads }}</h2>
      </div>

      <div class="download-grid">
        <section
          v-for="item in wpl2Downloads"
          :key="item.id"
          :id="item.id"
        >
          <a
            class="download-card"
            :href="file(item.file)"
            :download="item.downloadName || item.file"
          >
            <div class="badges">
              <span
                v-for="badge in item.badges"
                :key="badge"
                class="badge"
              >
                {{ badge }}
              </span>
            </div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.summary }}</p>
            <span class="card-action">{{ labels.download }}</span>
          </a>
        </section>
      </div>
    </section>
  </div>
</template>

<style scoped>
.container-work {
  max-width: 1120px;
  margin: 0 auto;
  padding: 2.5rem 0 4rem;
}

.work-tabs {
  display: inline-flex;
  gap: 0.35rem;
  margin-bottom: 2rem;
  padding: 0.35rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: rgba(17, 24, 39, 0.7);
}

.work-tab {
  min-width: 84px;
  padding: 0.55rem 0.85rem;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: var(--color-text-muted);
  font-size: 0.9rem;
  font-weight: 800;
  font-family: inherit;
  text-align: center;
  cursor: pointer;
  transition:
    background 0.2s ease,
    color 0.2s ease;
}

.work-tab:hover,
.work-tab.active {
  background: var(--color-accent-soft);
  color: var(--color-heading);
}

.work-period {
  margin-bottom: 4rem;
  scroll-margin-top: 110px;
}

.work-period--wpl2 {
  padding-top: 2.5rem;
  border-top: 1px solid rgba(148, 163, 184, 0.22);
}

.period-header {
  max-width: 760px;
  margin-bottom: 1.25rem;
}

.period-header--sub {
  margin-top: 2.5rem;
}

.period-kicker {
  margin-bottom: 0.45rem;
  color: var(--color-accent);
  font-size: 0.78rem;
  font-weight: 850;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.period-header h2 {
  color: var(--color-heading);
  font-size: 2rem;
  font-weight: 850;
  margin-bottom: 0.35rem;
}

.period-header p:not(.period-kicker) {
  color: var(--color-text-muted);
  line-height: 1.65;
}

.work-grid,
.download-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.1rem;
  align-items: stretch;
}

section {
  scroll-margin-top: 110px;
  min-width: 0;
}

a {
  display: block;
  height: 100%;
  text-decoration: none;
}

.opdracht,
.download-card,
.featured-card {
  height: 100%;
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: rgba(17, 24, 39, 0.76);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);
  transition:
    border-color 0.2s ease,
    transform 0.2s ease,
    background 0.2s ease;
}

.opdracht:hover,
.download-card:hover,
.featured-card:hover {
  border-color: var(--color-border-hover);
  background: rgba(20, 31, 47, 0.92);
  transform: translateY(-3px);
}

.opdracht {
  display: flex;
  flex-direction: column;
  min-height: 275px;
}

.opdracht h3 {
  display: flex;
  align-items: center;
  flex: 1;
  min-height: 94px;
  padding: 1rem 1.1rem;
  color: var(--color-heading);
  font-size: 1.02rem;
  font-weight: 800;
  line-height: 1.3;
}

.opdracht img {
  order: -1;
  width: 100%;
  height: 176px;
  object-fit: cover;
  border-bottom: 1px solid var(--color-border);
}

.opdracht--wpl2 .wpl2-preview-image {
  height: 168px;
  padding: 0.3rem;
  border: 1px solid rgba(148, 163, 184, 0.16);
  border-radius: 6px;
  object-fit: contain;
  background: #f8fafc;
}

.opdracht--wpl2 {
  gap: 0.8rem;
  padding: 1rem;
}

.opdracht--wpl2 h3,
.download-card h3 {
  min-height: auto;
  padding: 0;
}

.opdracht--wpl2 p,
.download-card p,
.featured-card p {
  color: var(--color-text-muted);
  line-height: 1.55;
}

.featured-card {
  display: grid;
  grid-template-columns: minmax(240px, 0.85fr) minmax(0, 1.15fr);
  min-height: 290px;
}

.card-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.85rem;
  padding: 1.5rem;
}

.card-content h3 {
  color: var(--color-heading);
  font-size: 2rem;
  font-weight: 850;
}

.card-visual {
  display: flex;
  align-items: end;
  min-height: 160px;
  padding: 1rem;
  border: 1px solid rgba(148, 163, 184, 0.16);
  border-radius: 6px;
  background:
    linear-gradient(135deg, rgba(56, 189, 248, 0.18), rgba(34, 197, 94, 0.12)),
    rgba(15, 23, 42, 0.92);
}

.card-visual--featured {
  min-height: 100%;
  padding: 0;
  border-width: 0 1px 0 0;
  border-radius: 0;
  overflow: hidden;
}

.card-visual span {
  color: var(--color-heading);
  font-size: 1.1rem;
  font-weight: 850;
  line-height: 1.2;
}

.card-visual img {
  width: 100%;
  height: 100%;
  min-height: 100%;
  object-fit: cover;
}

.card-visual--featured span {
  padding: 1rem;
  font-size: 2.35rem;
}

.badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.badge {
  padding: 0.28rem 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  color: var(--color-accent);
  font-size: 0.72rem;
  font-weight: 800;
  line-height: 1;
}

.card-action {
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  min-height: 34px;
  padding: 0.4rem 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: var(--color-accent-soft);
  color: var(--color-accent);
  font-size: 0.85rem;
  font-weight: 850;
}

.download-card {
  display: grid;
  gap: 0.75rem;
  padding: 1.15rem;
}

@media (max-width: 760px) {
  .work-grid,
  .download-grid,
  .featured-card {
    grid-template-columns: 1fr;
  }

  .opdracht img {
    height: 210px;
  }

  .card-visual--featured {
    min-height: 190px;
    border-width: 0 0 1px 0;
  }
}
</style>
