<script setup>
import { useI18n } from 'vue-i18n'

const { locale, t } = useI18n()
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
</style>