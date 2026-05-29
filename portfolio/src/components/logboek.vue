<script setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

defineOptions({ name: 'LogboekSection' })

const { tm } = useI18n()

const activeSemester = ref('semester1')

const logboekData = computed(() => tm('infoPage.logboek'))

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

// Get the active semester data
const activeSemesterData = computed(() => {
  if (logboekData.value.semesters) {
    return logboekData.value.semesters[activeSemester.value]
  }
  return null
})

// Get all weeks for the active semester
const weeks = computed(() => {
  return activeSemesterData.value?.weeks || []
})
</script>

<template>
  <section id="logboek" class="logboek">
    <h2 class="logboek__title">{{ $t('infoPage.nav.logboek') }}</h2>

    <!-- Semester Tabs -->
    <div class="logboek__tabs">
      <button
        v-for="(semester, key) in logboekData.semesters"
        :key="key"
        class="logboek__tab"
        :class="{ 'logboek__tab--active': activeSemester === key }"
        @click="activeSemester = key"
      >
        <span class="logboek__tab-label">{{ semester.title }}</span>
      </button>
    </div>

    <!-- Semester Info Badge -->
    <div v-if="activeSemesterData" class="logboek__semester-info">
      <span class="logboek__semester-badge" :class="`logboek__semester-badge--${activeSemester}`">
        {{ activeSemester === 'semester1' ? 'S1' : 'S2' }}
      </span>
      <span class="logboek__semester-desc">
        {{ activeSemesterData.title }}
      </span>
    </div>

    <!-- Table -->
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
            v-for="week in weeks"
            :key="`${activeSemester}-${week.week}`"
            :class="{ 'row--empty': isEmptyWeek(week) }"
          >
            <td class="col-week">
              <span class="week-number">{{ week.week }}</span>
            </td>
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
  margin-bottom: 2rem;
}

/* Semester Tabs */
.logboek__tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.logboek__tab {
  position: relative;
  padding: 0.75rem 1.5rem;
  background: rgba(17, 24, 39, 0.5);
  border: 2px solid var(--color-border);
  border-radius: 8px;
  color: var(--color-text-muted);
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.logboek__tab:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
  background: rgba(56, 189, 248, 0.08);
}

.logboek__tab--active {
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.15) 0%, rgba(34, 197, 94, 0.1) 100%);
  border-color: var(--color-accent);
  color: var(--color-accent);
  box-shadow: 0 0 0 1px var(--color-accent), 0 4px 12px rgba(56, 189, 248, 0.2);
}

.logboek__tab-label {
  display: block;
}

/* Semester Info */
.logboek__semester-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: rgba(56, 189, 248, 0.08);
  border-left: 4px solid var(--color-accent);
  border-radius: 4px;
  animation: slideInLeft 0.3s ease;
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.logboek__semester-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-weight: 800;
  font-size: 0.85rem;
  color: white;
}

.logboek__semester-badge--semester1 {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.logboek__semester-badge--semester2 {
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
}

.logboek__semester-desc {
  font-weight: 600;
  color: var(--color-text);
  font-size: 0.95rem;
}

/* Table Wrapper */
.logboek__table-wrap {
  overflow-x: auto;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: rgba(17, 24, 39, 0.72);
  box-shadow: var(--shadow-soft);
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.logboek__table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
  min-width: 860px;
}

.logboek__table thead tr {
  background-color: rgba(21, 31, 45, 0.95);
  border-bottom: 2px solid var(--color-accent);
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
  width: 80px;
  text-align: center;
}

.week-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(56, 189, 248, 0.1);
  border: 1px solid var(--color-accent);
  border-radius: 6px;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.logboek__table tbody tr:hover .week-number {
  background: rgba(56, 189, 248, 0.2);
  transform: scale(1.05);
}

.col-periode {
  white-space: nowrap;
  color: var(--color-text-muted);
  width: 140px;
  font-size: 0.85rem;
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
  padding-left: 1.25rem;
  position: relative;
}

.col-list ul li:before {
  content: '▸';
  position: absolute;
  left: 0;
  color: var(--color-accent);
  font-weight: bold;
}

/* Responsive Design */
@media (max-width: 768px) {
  .logboek {
    padding: 2rem 1rem;
  }

  .logboek__title {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .logboek__tabs {
    gap: 0.5rem;
  }

  .logboek__tab {
    padding: 0.6rem 1rem;
    font-size: 0.85rem;
  }

  .logboek__semester-info {
    gap: 0.75rem;
    padding: 0.75rem;
  }

  .logboek__semester-badge {
    width: 35px;
    height: 35px;
    font-size: 0.8rem;
  }

  .logboek__table {
    font-size: 0.8rem;
    min-width: 700px;
  }

  .logboek__table th {
    padding: 0.7rem 0.9rem;
    font-size: 0.75rem;
  }

  .logboek__table td {
    padding: 0.8rem 0.9rem;
  }

  .col-week {
    width: 70px;
  }

  .week-number {
    width: 35px;
    height: 35px;
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .logboek__table-wrap {
    border-radius: 4px;
  }

  .logboek__tab {
    padding: 0.5rem 0.8rem;
    font-size: 0.75rem;
  }

  .col-periode {
    width: 100px;
    font-size: 0.8rem;
  }

  .col-list ul li {
    padding-left: 1rem;
    font-size: 0.85rem;
  }
}
</style>