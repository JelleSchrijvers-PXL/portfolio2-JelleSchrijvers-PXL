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
