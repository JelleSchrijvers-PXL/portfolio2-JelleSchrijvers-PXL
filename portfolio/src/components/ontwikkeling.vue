<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
<section id="ontwikkeling" class="container-ontwikkeling">
    <h2>{{ t('ontwikkeling.title') }}</h2>

    <article class="content-block">
        <h3>{{ t('ontwikkeling.opleiding.title') }}</h3>

        <div class="content-subblock">
            <h4>{{ t('ontwikkeling.opleiding.why_programming_title') }}</h4>
            <p>{{ t('ontwikkeling.opleiding.why_programming_p1') }}</p>
            <p>{{ t('ontwikkeling.opleiding.why_programming_p2') }}</p>
            <p>{{ t('ontwikkeling.opleiding.why_programming_p3') }}</p>
        </div>

        <div class="content-subblock">
            <h4>{{ t('ontwikkeling.opleiding.why_job_title') }}</h4>
            <p>{{ t('ontwikkeling.opleiding.why_job_p1') }}</p>
            <p>{{ t('ontwikkeling.opleiding.why_job_p2') }}</p>
            <p>{{ t('ontwikkeling.opleiding.why_job_p3') }}</p>
        </div>
    </article>
</section>
</template>

<style scoped>

</style>