<script setup>
import { useI18n } from 'vue-i18n'

defineOptions({ name: 'AppFooter' })

const { t } = useI18n()
</script>

<template>
<footer>
    <p>© 2025 Jelle Schrijvers</p>
    <a href="#app" class="scroll-to-top" :aria-label="t('footer.backToTop')">
        ↑
    </a>
</footer>
</template>

<style scoped>
footer {
    margin-top: auto;
    padding: 2rem 0 0;
    border-top: 1px solid var(--color-border);
    color: var(--color-text-muted);
    font-size: 0.9rem;
}

/* Scroll to top button */
.scroll-to-top {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.9rem;
    height: 2.9rem;
    border: 1px solid var(--color-border);
    background-color: rgba(17, 24, 39, 0.92);
    color: var(--color-accent);
    border-radius: 50%;
    font-size: 1.25rem;
    text-align: center;
    box-shadow: var(--shadow-soft);
    transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease;
    z-index: 1000;
    text-decoration: none;
}

.scroll-to-top:hover {
    background-color: var(--color-accent);
    color: #08111d;
    transform: translateY(-3px);
}
</style>
