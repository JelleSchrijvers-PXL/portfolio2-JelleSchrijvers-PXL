<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

defineOptions({ name: 'LogboekSection' })

const { tm } = useI18n()

const logboek = computed(() => tm('infoPage.logboek'))

function formatPeriode(periode) {
  if (!periode) return '—'
  if (typeof periode === 'string') return periode || '—'
  const { van = '', tot = '' } = periode
  if (van && tot) return `${van.trim()} - ${tot.trim()}`
  if (van) return van.trim()
  if (tot) return tot.trim()
  return '—'
}

function toArray(val) {
  if (Array.isArray(val)) return val.filter(Boolean)
  if (typeof val === 'string' && val.trim()) return [val]
  return []
}

function isEmptyWeek(week) {
  return (
    !toArray(week.inhoud).length &&
    !toArray(week.evaluaties).length &&
    !toArray(week.opdrachten).length
  )
}
</script>

<template>
  <section id="logboek" class="logboek">
    <h2 class="logboek__title">{{ $t('infoPage.nav.logboek') }}</h2>

    <div class="logboek__table-wrap">
      <table class="logboek__table">
        <thead>
          <tr>
            <th>{{ $t('infoPage.logboek.col.week') }}</th>
            <th>{{ $t('infoPage.logboek.col.periode') }}</th>
            <th>{{ $t('infoPage.logboek.col.inhoud') }}</th>
            <th>{{ $t('infoPage.logboek.col.evaluaties') }}</th>
            <th>{{ $t('infoPage.logboek.col.opdrachten') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="week in logboek.weeks"
            :key="week.week"
            :class="{ 'row--empty': isEmptyWeek(week) }"
          >
            <td class="col-week">{{ week.week }}</td>
            <td class="col-periode">{{ formatPeriode(week.periode) }}</td>
            <td class="col-list">
              <ul v-if="toArray(week.inhoud).length">
                <li v-for="(item, i) in toArray(week.inhoud)" :key="i">{{ item }}</li>
              </ul>
            </td>
            <td class="col-list">
              <ul v-if="toArray(week.evaluaties).length">
                <li v-for="(item, i) in toArray(week.evaluaties)" :key="i">{{ item }}</li>
              </ul>
            </td>
            <td class="col-list">
              <ul v-if="toArray(week.opdrachten).length">
                <li v-for="(item, i) in toArray(week.opdrachten)" :key="i">{{ item }}</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<style scoped>
.logboek {
  max-width: 1120px;
  margin: 0 auto;
  padding: 3rem 0;
  color: var(--color-text);
  scroll-margin-top: 110px;
}

.logboek__title {
  font-size: 2rem;
  font-weight: 800;
  color: var(--color-heading);
  margin-bottom: 1.5rem;
}

.logboek__table-wrap {
  overflow-x: auto;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: rgba(17, 24, 39, 0.72);
  box-shadow: var(--shadow-soft);
}

.logboek__table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
  min-width: 860px;
}

.logboek__table thead tr {
  background-color: rgba(21, 31, 45, 0.95);
  border-bottom: 1px solid var(--color-border);
}

.logboek__table th {
  text-align: left;
  padding: 0.85rem 1.25rem;
  font-weight: 800;
  font-size: 0.85rem;
  color: var(--color-accent);
  letter-spacing: 0.03em;
}

.logboek__table tbody tr {
  border-bottom: 1px solid rgba(148, 163, 184, 0.12);
  transition: background-color 0.15s;
}

.logboek__table tbody tr:hover {
  background-color: rgba(56, 189, 248, 0.06);
}

.logboek__table tbody tr.row--empty {
  opacity: 0.35;
}

.logboek__table td {
  padding: 1rem 1.25rem;
  vertical-align: top;
  color: var(--color-text);
}

.col-week {
  font-weight: 800;
  color: var(--color-accent);
  width: 60px;
  text-align: center;
}

.col-periode {
  white-space: nowrap;
  color: var(--color-text-muted);
  width: 140px;
}

.col-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.col-list ul li {
  line-height: 1.5;
}
</style>
