<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

defineOptions({ name: 'OntwikkelingSection' })

const props = defineProps({
  activeSemester: {
    type: String,
    default: 'semester1'
  }
})

const { t, tm } = useI18n()

const sprint1Development = computed(() => ({
  label: t('infoPage.ontwikkeling.sprint1Label'),
  title: t('infoPage.ontwikkeling.opleiding.title'),
  sections: [
    {
      title: t('infoPage.ontwikkeling.opleiding.why_programming_title'),
      paragraphs: [
        t('infoPage.ontwikkeling.opleiding.why_programming_p1'),
        t('infoPage.ontwikkeling.opleiding.why_programming_p2'),
        t('infoPage.ontwikkeling.opleiding.why_programming_p3')
      ]
    },
    {
      title: t('infoPage.ontwikkeling.opleiding.why_job_title'),
      paragraphs: [
        t('infoPage.ontwikkeling.opleiding.why_job_p1'),
        t('infoPage.ontwikkeling.opleiding.why_job_p2'),
        t('infoPage.ontwikkeling.opleiding.why_job_p3')
      ]
    }
  ]
}))

const sprint2Development = computed(() => tm('infoPage.ontwikkeling.sprint2'))

const currentDevelopment = computed(() => {
  if (props.activeSemester === 'semester2' && sprint2Development.value?.sections) {
    return sprint2Development.value
  }

  return sprint1Development.value
})

const sectionKey = (section, index) => `${section.title}-${index}`

const xFactorKeys = ['leiderschap', 'creativiteit', 'samenwerking', 'professioneel']

const competentieKeys = ['ontwerper', 'programmeur', 'tester', 'communicator', 'levenslang']

const activiteitKeys = ['ontwerper', 'programmeur', 'tester', 'communicator', 'levenslang']

const sprint1Reflection = computed(() => ({
  title: t('infoPage.reflectie.title'),
  items: [
    {
      label: t('infoPage.reflectie.introductie_label'),
      text: t('infoPage.reflectie.introductie')
    },
    {
      label: t('infoPage.reflectie.positief_label'),
      text: t('infoPage.reflectie.positief')
    },
    {
      label: t('infoPage.reflectie.minder_label'),
      text: t('infoPage.reflectie.minder')
    },
    {
      label: t('infoPage.reflectie.inzichten_label'),
      text: t('infoPage.reflectie.inzichten')
    },
    {
      label: t('infoPage.reflectie.succes_label'),
      text: t('infoPage.reflectie.succes')
    }
  ]
}))

const sprint1NextWpl = computed(() => ({
  title: t('infoPage.volgendewpl.title'),
  paragraphs: [
    t('infoPage.volgendewpl.p1'),
    t('infoPage.volgendewpl.p2')
  ]
}))

const sprint1XFactor = computed(() => ({
  title: t('infoPage.xfactor.title'),
  items: xFactorKeys.map((key) => ({
    title: t(`infoPage.xfactor.items.${key}.title`),
    text: t(`infoPage.xfactor.items.${key}.tekst`)
  }))
}))

const sprint1Competencies = computed(() => ({
  title: t('infoPage.competenties.title'),
  labels: {
    situatie: t('infoPage.competenties.labels.situatie'),
    goed: t('infoPage.competenties.labels.goed'),
    niet: t('infoPage.competenties.labels.niet')
  },
  roles: competentieKeys.map((key) => ({
    title: t(`infoPage.competenties.rollen.${key}.title`),
    situatie: t(`infoPage.competenties.rollen.${key}.situatie`),
    goed: t(`infoPage.competenties.rollen.${key}.goed`),
    niet: t(`infoPage.competenties.rollen.${key}.niet`)
  }))
}))

const sprint1Activities = computed(() => ({
  title: t('infoPage.activiteiten.title'),
  motivatieLabel: t('infoPage.activiteiten.motivatie_label'),
  roles: activiteitKeys.map((roleKey) => {
    const role = tm(`infoPage.activiteiten.rollen.${roleKey}`)

    return {
      title: t(`infoPage.activiteiten.rollen.${roleKey}.title`),
      items: role.items || []
    }
  })
}))

const currentReflection = computed(() => {
  const sprint2 = tm('infoPage.reflectie.sprint2')
  return props.activeSemester === 'semester2' && sprint2?.items
    ? sprint2
    : sprint1Reflection.value
})

const currentNextWpl = computed(() => {
  const sprint2 = tm('infoPage.volgendewpl.sprint2')
  return props.activeSemester === 'semester2' && sprint2?.paragraphs
    ? sprint2
    : sprint1NextWpl.value
})

const currentXFactor = computed(() => {
  const sprint2 = tm('infoPage.xfactor.sprint2')
  return props.activeSemester === 'semester2' && sprint2?.items
    ? sprint2
    : sprint1XFactor.value
})

const currentCompetencies = computed(() => {
  const sprint2 = tm('infoPage.competenties.sprint2')
  return props.activeSemester === 'semester2' && sprint2?.roles
    ? sprint2
    : sprint1Competencies.value
})

const currentActivities = computed(() => {
  const sprint2 = tm('infoPage.activiteiten.sprint2')
  return props.activeSemester === 'semester2' && sprint2?.roles
    ? sprint2
    : sprint1Activities.value
})
</script>

<template>
  <!--  1. DEVELOPMENT -->
  <section id="ontwikkeling" class="container-ontwikkeling">
    <h2>{{ t('infoPage.ontwikkeling.title') }}</h2>

    <article class="content-block">
      <p class="sprint-label">{{ currentDevelopment.label }}</p>
      <h3>{{ currentDevelopment.title }}</h3>

      <div
        v-for="(section, sectionIndex) in currentDevelopment.sections"
        :key="sectionKey(section, sectionIndex)"
        class="content-subblock"
      >
        <h4>{{ section.title }}</h4>
        <p
          v-for="(paragraph, paragraphIndex) in section.paragraphs"
          :key="`${sectionKey(section, sectionIndex)}-${paragraphIndex}`"
        >
          {{ paragraph }}
        </p>
      </div>
    </article>
  </section>

  <!-- 2. REFLECTION WPL1 -->
  <section id="reflectie" class="container-reflectie">
    <h2>{{ currentReflection.title }}</h2>

    <article class="content-block">
      <p
        v-for="item in currentReflection.items"
        :key="item.label"
      >
        <strong>{{ item.label }}:</strong> {{ item.text }}
      </p>
    </article>
  </section>

  <!-- 3. NEXT WPL -->
  <section class="volgende-WPL">
    <h2>{{ currentNextWpl.title }}</h2>

    <article class="content-block">
      <p
        v-for="paragraph in currentNextWpl.paragraphs"
        :key="paragraph"
      >
        {{ paragraph }}
      </p>
    </article>
  </section>

  <!-- 4. X-FACTOR -->
  <section class="x-factor">
    <h2>{{ currentXFactor.title }}</h2>

    <div
      v-for="item in currentXFactor.items"
      :key="item.title"
      class="x-factor-item"
    >
      <h3>{{ item.title }}</h3>
      <p>{{ item.text }}</p>
    </div>
  </section>

  <!--  5. COMPETENCIES -->
  <section id="competenties">
    <h1>{{ currentCompetencies.title }}</h1>

    <article
      v-for="role in currentCompetencies.roles"
      :key="role.title"
      class="rol"
    >
      <h2>{{ role.title }}</h2>

      <h3>{{ currentCompetencies.labels.situatie }}</h3>
      <p>{{ role.situatie }}</p>

      <h3>{{ currentCompetencies.labels.goed }}</h3>
      <p>{{ role.goed }}</p>

      <h3>{{ currentCompetencies.labels.niet }}</h3>
      <p>{{ role.niet }}</p>
    </article>
  </section>

  <!-- 6. ACTIVITIES -->
  <section id="activiteiten">
    <h1>{{ currentActivities.title }}</h1>

    <article
      v-for="role in currentActivities.roles"
      :key="role.title"
      class="rol"
    >
      <h2>{{ role.title }}</h2>

      <div
        v-for="item in role.items"
        :key="item.title"
        class="activiteit"
      >
        <h3>{{ item.title }}</h3>
        <p>{{ item.beschrijving }}</p>
        <p class="motivatie">
          <strong>{{ currentActivities.motivatieLabel }}:</strong>
          {{ item.motivatie }}
        </p>
      </div>
    </article>
  </section>
</template>

<style scoped>
/*  Layout  */
section {
  max-width: 1120px;
  margin: 0 auto;
  padding: 3rem 0;
  border-top: 1px solid rgba(148, 163, 184, 0.14);
  scroll-margin-top: 110px;
}

/*  Typography  */
h1 {
  color: var(--color-heading);
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
}

h2 {
  color: var(--color-heading);
  font-size: 1.65rem;
  font-weight: 800;
  margin-bottom: 1rem;
}

h3 {
  color: var(--color-heading);
  font-size: 1.15rem;
  font-weight: 750;
  margin-bottom: 0.4rem;
}

h4 {
  color: var(--color-accent);
  font-size: 1rem;
  font-weight: 750;
  margin-bottom: 0.4rem;
}

p {
  color: var(--color-text);
  line-height: 1.7;
  margin-bottom: 0.75rem;
}

/*  Content blocks  */
.content-block {
  max-width: 860px;
  margin-bottom: 1.5rem;
}

.sprint-label {
  display: inline-flex;
  align-items: center;
  margin-bottom: 0.85rem;
  padding: 0.35rem 0.65rem;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: var(--color-accent-soft);
  color: var(--color-accent);
  font-size: 0.78rem;
  font-weight: 800;
  text-transform: uppercase;
}

.content-subblock {
  margin: 1.25rem 0;
  padding-left: 1rem;
  border-left: 3px solid var(--color-accent);
}

/*  Rolen  */
.rol {
  margin-bottom: 1.75rem;
  padding: 1.5rem 0;
  border-top: 1px solid rgba(148, 163, 184, 0.14);
}

/*  Activiteiten  */
.activiteit {
  margin-bottom: 1.25rem;
  padding: 1rem 1.15rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: rgba(17, 24, 39, 0.62);
}

.motivatie {
  font-size: 0.9rem;
  color: var(--color-text-muted);
}

/*  X-Factor  */
.x-factor-item {
  margin-bottom: 1.25rem;
  padding: 1rem 1.15rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: rgba(17, 24, 39, 0.62);
}

strong {
  color: var(--color-heading);
  font-weight: 800;
}
</style>
