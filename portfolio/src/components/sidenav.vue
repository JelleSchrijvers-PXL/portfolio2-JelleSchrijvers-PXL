<script setup>
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { computed, onMounted, ref, nextTick } from 'vue'

const { t } = useI18n()
const route = useRoute()

const navKey = computed(() => {
  if (route.name === 'info') return 'infoPage.nav'
  if (route.name === 'work') return 'workPage.nav'
  return null
})

const opdrachten = computed(() =>
  t('workPage.opdrachten', [], { returnObjects: true })
)

const pes = computed(() =>
  t('workPage.pes', [], { returnObjects: true })
)

const activeId = ref(null)

onMounted(async () => {
  await nextTick()

  const sections = document.querySelectorAll('section[id]')

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0.5) {
          activeId.value = entry.target.id
        }
      })
    },
    {
      threshold: [0.3, 0.5, 0.7]
    }
  )

  sections.forEach((section) => observer.observe(section))
})

const scrollTo = (id) => {
  const el = document.getElementById(id)

  if (el) {
    const yOffset = -80
    const y =
      el.getBoundingClientRect().top +
      window.pageYOffset +
      yOffset

    window.scrollTo({
      top: y,
      behavior: 'smooth'
    })
  }
}
</script>

<template>
  <aside v-if="navKey">
    <div class="container-nav-content">

      <!-- WORK PAGE -->
      <ul v-if="route.name === 'work'">

        <li class="header-lijst-sections">Opdrachten</li>
        <li v-for="opdracht in opdrachten" :key="opdracht.id">
          <a
            :class="{ active: activeId === opdracht.id }"
            @click.prevent="scrollTo(opdracht.id)"
          >
            {{ opdracht.title }}
          </a>
        </li>

        <li class="header-lijst-sections" style="margin-top: 1rem;">
          PE's
        </li>
        <li v-for="pe in pes" :key="pe.id">
          <a
            :class="{ active: activeId === pe.id }"
            @click.prevent="scrollTo(pe.id)"
          >
            {{ pe.title }}
          </a>
        </li>

      </ul>

    </div>
  </aside>
</template>

<style scoped>
.container-nav-content {
  position: fixed;
  margin-top: 5rem;
  width: 220px;
  padding: 20px;
}

.container-nav-content ul {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.header-lijst-sections {
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  color: #6e6e6e;
}

.container-nav-content a {
  color: #9c9c9c;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.25s ease;
  position: relative;
  cursor: pointer;
}

.container-nav-content a:hover {
  color: white;
  transform: translateX(4px);
}

.container-nav-content a.active {
  color: white;
  font-weight: 500;
}

.container-nav-content a.active::before {
  content: '';
  position: absolute;
  left: -10px;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 70%;
  background: white;
}
</style>