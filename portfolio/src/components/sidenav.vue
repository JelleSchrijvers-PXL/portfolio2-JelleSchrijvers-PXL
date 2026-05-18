<script setup>
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

defineOptions({ name: 'SideNav' })

const { tm } = useI18n()
const route = useRoute()

const navKey = computed(() => {
  if (route.name === 'info') return 'infoPage.nav'
  if (route.name === 'work') return 'workPage.nav'
  return null
})

const opdrachten = computed(() => tm('workPage.opdrachten'))

const pes = computed(() => tm('workPage.pes'))

const infoNav = computed(() => {
  const nav = tm('infoPage.nav')

  return [
    { id: 'aboutme', label: nav.aboutme },
    { id: 'logboek', label: nav.logboek },
    { id: 'ontwikkeling', label: nav.ontwikkeling },
    { id: 'reflectie', label: nav.reflectie },
    { id: 'competenties', label: nav.competenties },
    { id: 'activiteiten', label: nav.activiteiten }
  ]
})

const currentItems = computed(() => {
  if (route.name === 'info') return infoNav.value
  if (route.name === 'work') return [...opdrachten.value, ...pes.value]
  return []
})

const activeId = ref(null)
let scrollFrame = null
let activeLockUntil = 0

const updateActiveId = async () => {
  await nextTick()

  if (Date.now() < activeLockUntil) return

  const lastItem = currentItems.value[currentItems.value.length - 1]
  const isNearPageBottom =
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8

  if (isNearPageBottom && lastItem) {
    activeId.value = lastItem.id
    return
  }

  const marker = window.scrollY + 150
  let current = currentItems.value[0]?.id ?? null
  let smallestDistance = Number.POSITIVE_INFINITY

  currentItems.value.forEach((item) => {
    const section = document.getElementById(item.id)

    if (!section) return

    const top = section.getBoundingClientRect().top + window.scrollY
    const distance = Math.abs(top - marker)

    if (distance < smallestDistance) {
      smallestDistance = distance
      current = item.id
    }
  })

  activeId.value = current
}

const scheduleActiveUpdate = () => {
  if (scrollFrame) return

  scrollFrame = window.requestAnimationFrame(() => {
    scrollFrame = null
    updateActiveId()
  })
}

onMounted(() => {
  updateActiveId()
  window.addEventListener('scroll', scheduleActiveUpdate, { passive: true })
  window.addEventListener('resize', scheduleActiveUpdate)
})

watch(
  () => [route.name, currentItems.value.length],
  () => {
    activeId.value = null
    updateActiveId()
  }
)

onBeforeUnmount(() => {
  if (scrollFrame) {
    window.cancelAnimationFrame(scrollFrame)
  }

  window.removeEventListener('scroll', scheduleActiveUpdate)
  window.removeEventListener('resize', scheduleActiveUpdate)
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

    activeId.value = id
    activeLockUntil = Date.now() + 900
  }
}
</script>

<template>
  <aside v-if="navKey">
    <div class="container-nav-content">
      <!-- INFO PAGE -->
      <ul v-if="route.name === 'info'">
        <li class="header-lijst-sections">{{ tm('infoPage.nav').content }}</li>
        <li v-for="item in infoNav" :key="item.id">
          <a
            :class="{ active: activeId === item.id }"
            @click.prevent="scrollTo(item.id)"
          >
            {{ item.label }}
          </a>
        </li>
      </ul>

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
  top: calc(var(--header-height) + 1rem);
  left: 0;
  bottom: 1.5rem;
  width: var(--sidenav-width);
  padding: 0 1.25rem 1rem 2rem;
  overflow-y: auto;
  border-right: 1px solid var(--color-border);
}

.container-nav-content ul {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.header-lijst-sections {
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  color: var(--color-text-muted);
  font-weight: 800;
}

.container-nav-content a {
  display: block;
  padding: 0.25rem 0;
  color: var(--color-text-muted);
  text-decoration: none;
  font-size: 0.9rem;
  line-height: 1.35;
  transition: all 0.25s ease;
  position: relative;
  cursor: pointer;
}

.container-nav-content a:hover {
  color: var(--color-heading);
  transform: translateX(4px);
}

.container-nav-content a.active {
  color: var(--color-heading);
  font-weight: 750;
}

.container-nav-content a.active::before {
  content: '';
  position: absolute;
  left: -10px;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 70%;
  background: var(--color-accent);
  border-radius: 999px;
}

@media (max-width: 980px) {
  aside {
    display: none;
  }
}
</style>
