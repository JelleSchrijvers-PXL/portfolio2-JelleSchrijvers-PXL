<script setup>
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { tm } = useI18n()

const img = (bestand) =>
  new URL(`../assets/foto/${bestand}`, import.meta.url).href

const opdrachtenFixed = computed(() =>
  tm('workPage.opdrachten').map(item => ({
    ...item,
    image: img(item.image)
  }))
)

const pesFixed = computed(() =>
  tm('workPage.pes').map(item => ({
    ...item,
    image: img(item.image)
  }))
)
</script>

<template>
  <div class="container-work">
    <!-- Opdrachten -->
    <div class="container-projecten">
      <h2>Opdrachten</h2>
      <section v-for="item in opdrachtenFixed" :key="item.id">
        <router-link :to="`/project/${item.id}`">
          <article class="opdracht">
            <h3>{{ item.title }}</h3>
            <img :src="item.image" :alt="item.alt" />
          </article>
        </router-link>
      </section>
    </div>

    <!-- PE's -->
     <div class="containter-PE">
      <h2>PE's</h2>

      <section v-for="item in pesFixed" :key="item.id">
        <router-link :to="`/project/${item.id}`">
          <article class="opdracht">
            <h3>{{ item.title }}</h3>
            <img :src="item.image" :alt="item.alt" />
          </article>
        </router-link>
      </section>
    </div>

  </div>
</template>