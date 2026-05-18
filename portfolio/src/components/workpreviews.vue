<script setup>
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

defineOptions({ name: 'WorkPreviews' })

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
    <div class="container-projecten">
      <h2>Opdrachten</h2>
      <section v-for="item in opdrachtenFixed" :key="item.id" :id="item.id">
        <router-link :to="`/project/${item.id}`">
          <article class="opdracht">
            <h3>{{ item.title }}</h3>
            <img :src="item.image" :alt="item.alt" />
          </article>
        </router-link>
      </section>
    </div>

    <div class="containter-PE">
      <h2>PE's</h2>

      <section v-for="item in pesFixed" :key="item.id" :id="item.id">
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

<style scoped>
.container-work {
  max-width: 1120px;
  margin: 0 auto;
  padding: 2.5rem 0 4rem;
}

.container-projecten,
.containter-PE {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.1rem;
  align-items: stretch;
  margin-bottom: 3.25rem;
}

h2 {
  grid-column: 1 / -1;
  color: var(--color-heading);
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 0.25rem;
}

section {
  scroll-margin-top: 110px;
  min-width: 0;
}

a {
  display: block;
  height: 100%;
  text-decoration: none;
}

.opdracht {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 275px;
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: rgba(17, 24, 39, 0.76);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);
  transition:
    border-color 0.2s ease,
    transform 0.2s ease,
    background 0.2s ease;
}

.opdracht:hover {
  border-color: var(--color-border-hover);
  background: rgba(20, 31, 47, 0.92);
  transform: translateY(-3px);
}

.opdracht h3 {
  display: flex;
  align-items: center;
  flex: 1;
  min-height: 94px;
  padding: 1rem 1.1rem;
  color: var(--color-heading);
  font-size: 1.02rem;
  font-weight: 800;
  line-height: 1.3;
}

.opdracht img {
  order: -1;
  width: 100%;
  height: 176px;
  object-fit: cover;
  border-bottom: 1px solid var(--color-border);
}

@media (max-width: 760px) {
  .container-projecten,
  .containter-PE {
    grid-template-columns: 1fr;
  }

  .opdracht img {
    height: 210px;
  }
}
</style>
