<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
<div id="aboutme" class="container-over-mij">
    <section class="over-mij section-card">
        <p>{{ t('about.text') }}</p>
    </section>
    <img src = "../assets/foto/Schermafbeelding 2025-11-21 170209.png" alt="foto van basketbal"/>
</div>
</template>

<style scoped>
.container-over-mij {
    margin: 2rem;
    display: flex;
    flex-direction: row;
}
.over-mij {
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: 2.5rem;
}
.over-mij p {
    line-height: 1.7;
    color: #d1d5db;
}
.over-mij img {
    width: 100%;
    border-radius: 12px;
    object-fit: cover;
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.6);
}
</style>