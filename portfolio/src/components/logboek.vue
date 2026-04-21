<script setup>
import { useI18n } from 'vue-i18n'

const { tm } = useI18n()

const logboek = tm('logboek')

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
  <section class="logboek">
    <h2 class="logboek__title">{{ $t('nav.logboek') }}</h2>

    <table class="logboek__table">
      <thead>
        <tr>
          <th>{{ $t('logboek.col.week') }}</th>
          <th>{{ $t('logboek.col.periode') }}</th>
          <th>{{ $t('logboek.col.inhoud') }}</th>
          <th>{{ $t('logboek.col.evaluaties') }}</th>
          <th>{{ $t('logboek.col.opdrachten') }}</th>
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
  </section>
</template>

<style scoped>
.logboek {
  font-family: 'Segoe UI', sans-serif;
  padding: 2rem;
  background-color: #0d1117;
  min-height: 100vh;
  color: #c9d1d9;
}

.logboek__title {
  font-size: 2rem;
  font-weight: 700;
  color: #58a6ff;
  margin-bottom: 1.5rem;
}

.logboek__table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.logboek__table thead tr {
  background-color: #161b22;
  border-bottom: 2px solid #30363d;
}

.logboek__table th {
  text-align: left;
  padding: 0.85rem 1.25rem;
  font-weight: 600;
  font-size: 0.85rem;
  color: #58a6ff;
  letter-spacing: 0.03em;
}

.logboek__table tbody tr {
  border-bottom: 1px solid #21262d;
  transition: background-color 0.15s;
}

.logboek__table tbody tr:hover {
  background-color: #161b22;
}

.logboek__table tbody tr.row--empty {
  opacity: 0.35;
}

.logboek__table td {
  padding: 1rem 1.25rem;
  vertical-align: top;
  color: #c9d1d9;
}

.col-week {
  font-weight: 600;
  color: #58a6ff;
  width: 60px;
  text-align: center;
}

.col-periode {
  white-space: nowrap;
  color: #8b949e;
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
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  line-height: 1.5;
}

.col-list ul li::before {
  content: '•';
  color: #58a6ff;
  flex-shrink: 0;
  margin-top: 1px;
}
</style>