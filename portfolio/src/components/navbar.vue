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
          <a href="#">{{ $t('nav.cv') }}</a>
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

<style scoped>
/* Header */
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  min-height: var(--header-height);
  border-bottom: 1px solid var(--color-border);
  background: rgba(10, 15, 23, 0.84);
  backdrop-filter: blur(18px);
}

.container-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  min-height: var(--header-height);
  padding: 0.75rem 2rem;
}

.container-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* Left */
.basis-info {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.container-profile-picture img {
  width: 3.6rem;
  height: 3.6rem;
  border: 2px solid rgba(56, 189, 248, 0.35);
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 0 0 6px rgba(56, 189, 248, 0.06);
}

.container-name h1 {
  margin: 0;
  color: var(--color-heading);
  font-size: 1.15rem;
  font-weight: 750;
  line-height: 1.1;
}

.container-functie {
  margin-top: 0.2rem;
  font-size: 0.85rem;
  color: var(--color-text-muted);
}

/* Center nav */
.container-center nav ul {
  display: flex;
  list-style: none;
  gap: 0.25rem;
  background: rgba(255, 255, 255, 0.05);
  padding: 0.4rem;
  border-radius: 999px;
  border: 1px solid var(--color-border);
}

.container-center nav a {
  display: block;
  padding: 0.45rem 1.1rem;
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: 650;
  text-decoration: none;
  color: var(--color-text);
  transition:
    background 0.2s ease,
    color 0.2s ease;
}

.container-center nav a:hover,
.container-center nav .router-link-active {
  background: var(--color-accent-soft);
  color: #ffffff;
}

/* Right */
.container-social {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.container-social a {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  font-weight: 650;
  color: var(--color-text);
  text-decoration: none;
  transition: color 0.2s ease;
}

.container-social a:hover {
  color: var(--color-accent);
}

.container-social img {
  width: 1rem;
  height: 1rem;
}

.language-switch {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.04);
}

.language-switch button {
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--color-text-muted);
  cursor: pointer;
  font: inherit;
  font-size: 0.78rem;
  font-weight: 750;
  padding: 0.35rem 0.55rem;
}

.language-switch button.active,
.language-switch button:hover {
  background: rgba(56, 189, 248, 0.16);
  color: #ffffff;
}

@media (max-width: 860px) {
  .container-nav {
    align-items: flex-start;
    flex-direction: column;
    gap: 0.85rem;
    padding: 0.9rem 1rem;
  }

  header {
    position: sticky;
  }

  .container-right,
  .container-center,
  .container-center nav,
  .container-center nav ul {
    width: 100%;
  }

  .container-center nav ul {
    justify-content: center;
  }

  .container-right {
    justify-content: space-between;
  }
}
</style>
