<script setup>
import { useI18n } from 'vue-i18n'
import profilePicture from '../assets/foto/profile-picture.jpg'
import linkedIn from '../assets/icoon/linkedin-svgrepo-com.svg'

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
            <img :src="profilePicture" alt="foto van Jelle Schrijvers">
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
            <li><RouterLink to="/" >{{ $t('nav.info') }}</RouterLink></li>
            <li><RouterLink to="/work" >{{ $t('nav.work') }}</RouterLink></li>
          </ul>
        </nav>
      </div>

      <div class="container-right">
        <div class="container-social">
          <a href="https://www.linkedin.com/in/jelleschrijvers/" target="_blank">
          <img :src="linkedIn" alt="icoon-linkedin">LinkedIn
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
/* Header */
header {
  padding: 1.5rem 2.5rem;
}
.container-nav {
  position: sticky;
  top: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}

/* Navbar layout */
.container-left {
  justify-self: start;
}
.container-center {
  justify-self: center;
}
.container-right {
  justify-self: end;
}

/* Left */
.basis-info {
  display: flex;           
  align-items: center;     
  gap: 1rem;               
}
.container-profile-picture img {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;      
  object-fit: cover;       
}
.container-name-functie {
  display: flex;
  flex-direction: column;  
  justify-content: center; 
}
.container-name-functie h1 {
  margin: 0;
  font-size: 1.4rem;
}
.container-functie {
  margin: 0;
  font-size: 0.85rem;
  color: #9ca3af;
}

/* Center nav */
.container-center nav ul {
  display: flex;
  list-style: none;
  gap: 0.25rem;
  background: rgba(255, 255, 255, 0.06);
  padding: 0.4rem;
  border-radius: 999px;
  backdrop-filter: blur(12px);
}
.container-center nav a{
  padding: 0.45rem 1.1rem;
  border-radius: 999px;
  font-size: 0.9rem;
  text-decoration: none;
  color: #e5e7eb;
  transition: background 0.2s ease;
}
.container-center nav a :hover,
.container-center nav .router-link-active {
  background: rgba(255, 255, 255, 0.12);
}

/* Right */
.container-social {
  display: flex;
  gap: 1rem;
}
.container-social a {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  color: #e5e7eb;
  text-decoration: none;
}
.container-social a:hover{
  color: blue;
}
.container-social img {
  width: 1rem;
  height: 1rem;
}
</style>