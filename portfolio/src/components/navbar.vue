<script setup>
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

function setLang(lang) {
  locale.value = lang
  localStorage.setItem('lang', lang)
}
</script>

<template>
  <header>
    <div class="container-nav">
      
      <div class="container-left">
        <div class="basis-info">
          <div class="container-profile-picture">
          
          </div>

          <div class="container-name">
            <h1>Jelle Schrijvers</h1>
            <p class="container-functie">
              <span>{{ $t('nav.student') }}</span>
            </p>
          </div>
        </div>
      </div>

      <div class="container-center">
        <nav>
          <ul>
            <li><a href="#">{{ $t('nav.info') }}</a></li>
            <li><a href="#">{{ $t('nav.work') }}</a></li>
          </ul>
        </nav>
      </div>

      <div class="container-right">
        <div class="container-social">
          <a href="https://www.linkedin.com/in/jelleschrijvers/" target="_blank">
            LinkedIn
          </a>
          <a href="#">{{ $t('nav.cv') }}</a>
        </div>

        <!-- Language switch -->
        <div>
          <button @click="setLang('nl')">NL</button>
          <button @click="setLang('en')">EN</button>
        </div>

      </div>
    </div>
  </header>
</template>

<style scoped>
h1{
  color: white;
}
</style>