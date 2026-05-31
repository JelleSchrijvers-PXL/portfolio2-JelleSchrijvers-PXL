<script setup>
import { useI18n } from 'vue-i18n'
import profilePicture from '../assets/foto/profile-picture.jpg'
import linkedIn from '../assets/icoon/linkedin-svgrepo-com.svg'

defineOptions({ name: 'AppNavbar' })

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
            <img :src="profilePicture" alt="foto van Jelle Schrijvers" />
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
        <nav aria-label="Hoofdnavigatie">
          <ul>
            <li><RouterLink to="/">{{ $t('nav.info') }}</RouterLink></li>
            <li><RouterLink to="/work">{{ $t('nav.work') }}</RouterLink></li>
          </ul>
        </nav>
      </div>

      <div class="container-right">
        <div class="container-social">
          <a
            href="https://www.linkedin.com/in/jelleschrijvers/"
            target="_blank"
            rel="noreferrer"
          >
            <img :src="linkedIn" alt="icoon-linkedin" />LinkedIn
          </a>
          <RouterLink :to="{ name: 'cv' }">{{ $t('nav.cv') }}</RouterLink>
        </div>

        <div class="language-switch" aria-label="Taal kiezen">
          <button
            type="button"
            :class="{ active: locale === 'nl' }"
            @click="setLang('nl')"
          >
            NL
          </button>
          <button
            type="button"
            :class="{ active: locale === 'en' }"
            @click="setLang('en')"
          >
            EN
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
