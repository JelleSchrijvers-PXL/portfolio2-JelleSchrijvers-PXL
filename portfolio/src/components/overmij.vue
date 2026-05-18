<script setup>
import { useI18n } from 'vue-i18n'

defineOptions({ name: 'OverMijSection' })

const { t } = useI18n()
</script>

<template>
  <div id="aboutme" class="container-over-mij">
    <section class="over-mij">
      <p class="eyebrow">Portfolio</p>
      <h2>{{ t('infoPage.nav.aboutme') }}</h2>
      <p>{{ t('infoPage.about.text') }}</p>
    </section>

    <figure class="profile-visual">
      <img src="../assets/foto/Schermafbeelding 2025-11-21 170209.png" alt="foto van basketbal" />
    </figure>
  </div>
</template>

<style scoped>
.container-over-mij {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(280px, 0.75fr);
  gap: 2rem;
  align-items: stretch;
  max-width: 1120px;
  margin: 0 auto;
  padding: 2.5rem 0 3rem;
  scroll-margin-top: 110px;
}

.over-mij {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 360px;
  padding: 2rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: linear-gradient(180deg, rgba(17, 24, 39, 0.9), rgba(15, 23, 36, 0.74));
  box-shadow: var(--shadow-soft);
}

.over-mij .eyebrow {
  margin-bottom: 0.75rem;
  color: var(--color-accent);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.over-mij h2 {
  margin-bottom: 1rem;
  color: var(--color-heading);
  font-size: 3.4rem;
  font-weight: 800;
  line-height: 1;
}

.over-mij p {
  line-height: 1.8;
  color: var(--color-text);
}

.profile-visual {
  min-height: 360px;
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-surface-strong);
  box-shadow: var(--shadow-soft);
}

.profile-visual img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 900px) {
  .container-over-mij {
    grid-template-columns: 1fr;
  }

  .over-mij,
  .profile-visual {
    min-height: auto;
  }

  .over-mij h2 {
    font-size: 2.4rem;
  }
}
</style>
