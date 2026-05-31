<script setup>
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

defineOptions({ name: 'SideNav' })

const props = defineProps({
  activeWpl: {
    type: String,
    default: 'wpl1'
  }
})

const { tm } = useI18n()
const route = useRoute()

const navKey = computed(() => {
  if (route.name === 'info') return 'infoPage.nav'
  if (route.name === 'work') return 'workPage.nav'
  return null
})

const opdrachten = computed(() => tm('workPage.opdrachten'))

const pes = computed(() => tm('workPage.pes'))

const workLabels = computed(() => tm('workPage.labels'))

const wpl1ProjectIds = new Set(['scratch', 'CV', 'portfolio'])

const wpl1Opdrachten = computed(() =>
  opdrachten.value.filter((item) => !wpl1ProjectIds.has(item.id))
)

const wpl1Projecten = computed(() =>
  opdrachten.value.filter((item) => wpl1ProjectIds.has(item.id))
)

const wpl2Project = computed(() => tm('workPage.wpl2Project'))

const wpl2Opdrachten = computed(() => tm('workPage.wpl2Opdrachten'))

const wpl2Downloads = computed(() => tm('workPage.wpl2Downloads'))

const personalProjects = computed(() => tm('workPage.personalProjects'))

const groupTitle = (label, wplLabel) => `${label} ${wplLabel}`

const workNavGroups = computed(() => {
  if (props.activeWpl === 'personal') {
    return [
      {
        title: workLabels.value.personalProjects,
        items: personalProjects.value
      }
    ]
  }

  if (props.activeWpl === 'wpl2') {
    return [
      {
        title: groupTitle(workLabels.value.opdrachten, workLabels.value.wpl2),
        items: wpl2Opdrachten.value
      },
      {
        title: groupTitle(workLabels.value.evaluations, workLabels.value.wpl2),
        items: wpl2Downloads.value
      },
      {
        title: groupTitle(workLabels.value.projects, workLabels.value.wpl2),
        items: [wpl2Project.value].filter(Boolean)
      }
    ]
  }

  return [
    {
      title: groupTitle(workLabels.value.opdrachten, workLabels.value.wpl1),
      items: wpl1Opdrachten.value
    },
    {
      title: groupTitle(workLabels.value.evaluations, workLabels.value.wpl1),
      items: pes.value
    },
    {
      title: groupTitle(workLabels.value.projects, workLabels.value.wpl1),
      items: wpl1Projecten.value
    }
  ]
})

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
  if (route.name === 'work') return workNavGroups.value.flatMap((group) => group.items)
  return []
})

const activeId = ref(null)
let scrollFrame = null
let activeLockUntil = 0

const updateActiveId = async () => {
  await nextTick()

  if (Date.now() < activeLockUntil) return

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
  () => [route.name, props.activeWpl, currentItems.value.length],
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
        <template
          v-for="group in workNavGroups"
          :key="group.title"
        >
          <li class="header-lijst-sections">{{ group.title }}</li>
          <li v-for="item in group.items" :key="item.id">
            <a
              :class="{ active: activeId === item.id }"
              @click.prevent="scrollTo(item.id)"
            >
              {{ item.title }}
            </a>
          </li>
        </template>
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

.header-lijst-sections:not(:first-child) {
  margin-top: 1rem;
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
