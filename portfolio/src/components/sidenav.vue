<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
<aside>
  <div class="container-nav-content">
    <ul>
      <li class="header-lijst-sections">{{ t('nav.content') }}</li>

      <li><a href="#aboutme">{{ t('nav.aboutme') }}</a></li>
      <li><a href="#logboek">{{ t('nav.logboek') }}</a></li>
      <li><a href="#ontwikkeling">{{ t('nav.ontwikkeling') }}</a></li>
      <li><a href="#reflectie">{{ t('nav.reflectie') }}</a></li>
      <li><a href="#competenties">{{ t('nav.competenties') }}</a></li>
      <li><a href="#activiteiten">{{ t('nav.activiteiten') }}</a></li>
    </ul>
  </div>
</aside>
</template>

<style scoped>
.container-nav-content {
  position: fixed;
  margin-top: 5rem;
  width: 200px;
  padding: 20px;
}

/* NAV STYLING */
.container-nav-content ul {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* LIST HEADER */
.header-lijst-sections {
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  color: #7a7a7a;
  margin-bottom: 1rem;
}

/* LIST ITEMS */
.container-nav-content li {
  list-style: none;
}

/* LINKS */
.container-nav-content a {
  color: #9c9c9c;
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.2s ease;
}
.container-nav-content a:hover {
  color: #ffffff;
}
</style>