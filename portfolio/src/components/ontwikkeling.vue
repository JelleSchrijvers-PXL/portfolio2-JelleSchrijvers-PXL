<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const xFactorKeys = ['leiderschap', 'creativiteit', 'samenwerking', 'professioneel']

const competentieKeys = ['ontwerper', 'programmeur', 'tester', 'communicator', 'levenslang']

const activiteitKeys = ['ontwerper', 'programmeur', 'tester', 'communicator', 'levenslang']

// Elke rol heeft 3 rollen
const activityCount = 3 
</script>

<template>
  <!--  1. DEVELOPMENT -->
  <section id="ontwikkeling" class="container-ontwikkeling">
    <h2>{{ t('ontwikkeling.title') }}</h2>

    <article class="content-block">
      <h3>{{ t('ontwikkeling.opleiding.title') }}</h3>

      <div class="content-subblock">
        <h4>{{ t('ontwikkeling.opleiding.why_programming_title') }}</h4>
        <p>{{ t('ontwikkeling.opleiding.why_programming_p1') }}</p>
        <p>{{ t('ontwikkeling.opleiding.why_programming_p2') }}</p>
        <p>{{ t('ontwikkeling.opleiding.why_programming_p3') }}</p>
      </div>

      <div class="content-subblock">
        <h4>{{ t('ontwikkeling.opleiding.why_job_title') }}</h4>
        <p>{{ t('ontwikkeling.opleiding.why_job_p1') }}</p>
        <p>{{ t('ontwikkeling.opleiding.why_job_p2') }}</p>
        <p>{{ t('ontwikkeling.opleiding.why_job_p3') }}</p>
      </div>
    </article>
  </section>

  <!-- 2. REFLECTION WPL1 -->
  <section id="reflectie" class="container-reflectie">
    <h2>{{ t('reflectie.title') }}</h2>

    <article class="content-block">
      <p><strong>{{ t('reflectie.introductie_label') }}:</strong> {{ t('reflectie.introductie') }}</p>
      <p><strong>{{ t('reflectie.positief_label') }}:</strong> {{ t('reflectie.positief') }}</p>
      <p><strong>{{ t('reflectie.minder_label') }}:</strong> {{ t('reflectie.minder') }}</p>
      <p><strong>{{ t('reflectie.inzichten_label') }}:</strong> {{ t('reflectie.inzichten') }}</p>
      <p><strong>{{ t('reflectie.succes_label') }}:</strong> {{ t('reflectie.succes') }}</p>
    </article>
  </section>

  <!-- 3. NEXT WPL -->
  <section class="volgende-WPL">
    <h2>{{ t('volgendewpl.title') }}</h2>

    <article class="content-block">
      <p>{{ t('volgendewpl.p1') }}</p>
      <p>{{ t('volgendewpl.p2') }}</p>
    </article>
  </section>

  <!-- 4. X-FACTOR -->
  <section class="x-factor">
    <h2>{{ t('xfactor.title') }}</h2>

    <div
      v-for="key in xFactorKeys"
      :key="key"
      class="x-factor-item"
    >
      <h3>{{ t(`xfactor.items.${key}.title`) }}</h3>
      <p>{{ t(`xfactor.items.${key}.tekst`) }}</p>
    </div>
  </section>

  <!--  5. COMPETENCIES -->
  <section id="competenties">
    <h1>{{ t('competenties.title') }}</h1>

    <article
      v-for="key in competentieKeys"
      :key="key"
      class="rol"
    >
      <h2>{{ t('competenties.labels.situatie') === t('competenties.labels.situatie') ? 'Role: ' : '' }}{{ t(`competenties.rollen.${key}.title`) }}</h2>

      <h3>{{ t('competenties.labels.situatie') }}</h3>
      <p>{{ t(`competenties.rollen.${key}.situatie`) }}</p>

      <h3>{{ t('competenties.labels.goed') }}</h3>
      <p>{{ t(`competenties.rollen.${key}.goed`) }}</p>

      <h3>{{ t('competenties.labels.niet') }}</h3>
      <p>{{ t(`competenties.rollen.${key}.niet`) }}</p>
    </article>
  </section>

  <!-- 6. ACTIVITIES -->
  <section id="activiteiten">
    <h1>{{ t('activiteiten.title') }}</h1>

    <article
      v-for="rolKey in activiteitKeys"
      :key="rolKey"
      class="rol"
    >
      <h2>{{ t(`activiteiten.rollen.${rolKey}.title`) }}</h2>

      <div
        v-for="index in activityCount"
        :key="index"
        class="activiteit"
      >
        <h3>{{ t(`activiteiten.rollen.${rolKey}.items[${index - 1}].title`) }}</h3>
        <p>{{ t(`activiteiten.rollen.${rolKey}.items[${index - 1}].beschrijving`) }}</p>
        <p class="motivatie">
          <strong>{{ t('activiteiten.motivatie_label') }}:</strong>
          {{ t(`activiteiten.rollen.${rolKey}.items[${index - 1}].motivatie`) }}
        </p>
      </div>
    </article>
  </section>
</template>

<style scoped>
/*  Layout  */
section {
  padding: 2rem 1.5rem;
}

/*  Typography  */
h1 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

h3 {
  font-size: 1.15rem;
  margin-bottom: 0.4rem;
}

h4 {
  font-size: 1rem;
  margin-bottom: 0.4rem;
}

p {
  line-height: 1.7;
  margin-bottom: 0.75rem;
}

/*  Content blocks  */
.content-block {
  margin-bottom: 1.5rem;
}

.content-subblock {
  margin-bottom: 1.25rem;
}

/*  Rolen  */
.rol {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
}

/*  Activiteiten  */
.activiteit {
  margin-bottom: 1.25rem;
  padding-left: 1rem;
  border-left: 3px solid #cbd5e1;
}

.motivatie {
  font-size: 0.9rem;
  color: #64748b;
}

/*  X-Factor  */
.x-factor-item {
  margin-bottom: 1.25rem;
}
</style>