<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
<footer>
    <p>© 2025 Jelle Schrijvers</p>
    <a href="#aboutme" class="scroll-to-top" :aria-label="t('footer.backToTop')">
        ↑
    </a>
</footer>
</template>

<style scoped>
/* Scroll to top button */
.scroll-to-top {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background-color: #1f2937;
    color: #38bdf8;
    padding: 0.8rem 1rem;
    border-radius: 50%;
    font-size: 1.5rem;
    text-align: center;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.6);
    transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease;
    z-index: 1000;
    text-decoration: none;
}

.scroll-to-top:hover {
    background-color: #38bdf8;
    color: #111827;
    transform: translateY(-3px);
}
</style>