<script setup>
import { ref } from 'vue'
import profilePicture from '@/assets/foto/profile-picture.jpg'
import basketballImage from '@/assets/foto/Schermafbeelding 2025-11-21 170209.png'
import cvPdf from '@/assets/files/cv_schrijvers_jelle (1).pdf'

defineOptions({ name: 'CvPage' })

const workExperience = [
  {
    title: 'Uitvoerder groenbeheer',
    company: 'Geerts Waterwerken',
    period: 'Juni 2024 - Augustus 2024',
    description:
      'Ervaren in het onderhoud van groenvoorzieningen en openbare ruimtes, waaronder het scheren van hagen, onderhouden van beken en plassen, en het uitvoeren van diverse groenwerkzaamheden zoals snoeien en maaien.'
  },
  {
    title: 'Uitvoerder groenbeheer',
    company: 'Michel Schrijvers',
    period: 'Juli 2023 - nu',
    description:
      'Ervaren in het onderhoud en aanleggen van tuinen, waaronder het scheren van hagen, bomen planten, kunstgras plaatsen, kiezels leggen en diverse andere groenwerkzaamheden.'
  },
  {
    title: 'Zaalmedewerker',
    company: 'Pasta Pronto',
    period: 'Mei 2025 - nu',
    description:
      'Ervaren in het opnemen en opdienen van klanten. Waaronder het maken van drankjes, opdekken van tafels en onderhouden van de planten in de zaak.'
  },
  {
    title: 'Kassamedewerker + uitpak',
    company: 'Carrefour Market Paal',
    period: 'Oktober 2025 - nu',
    description:
      'Bij Carrefour Market stond ik aan de kassa, waar ik verantwoordelijk was voor een vlotte bediening en het correct beheren en tellen van mijn eigen kassa. Wanneer het rustig was, hield ik de winkel netjes, controleerde ik houdbaarheidsdata, keek ik groenten en fruit na en vulde ik de rekken aan.'
  }
]

const hardSkills = [
  {
    title: 'Software & Tools',
    items: ['Microsoft 365', 'Adobe Premiere Pro', 'Canva', 'Blender']
  },
  {
    title: 'Programmeertalen & IT',
    items: ['HTML', 'CSS', 'JavaScript', 'C#', 'Python', 'SQL', 'Git', 'GitHub']
  },
  {
    title: 'Data & Analyse',
    items: ['Basis statistiek', 'Excel-grafieken', 'Dashboards']
  },
  {
    title: 'Projectmethodes',
    items: ['Scrum/Kanban basis', 'Documentatie opstellen']
  }
]

const softSkills = [
  {
    title: 'Persoonlijke vaardigheden',
    items: ['Doorzettingsvermogen', 'Zelfdiscipline', 'Probleemoplossend denken', 'Verantwoordelijkheid nemen']
  },
  {
    title: 'Organisatie & planning',
    items: ['Tijdmanagement', 'Prioriteiten stellen', 'Deadlines opvolgen']
  },
  {
    title: 'Creativiteit & initiatief',
    items: ['Conceptontwikkeling', 'Basis marketing', 'Origineel denken', 'Initiatief nemen']
  }
]

const languages = [
  { name: 'Nederlands', level: 'Moedertaal', value: 100 },
  { name: 'Engels', level: 'Vlot', value: 90 },
  { name: 'Frans', level: 'Basis', value: 25 }
]

const showPdf = ref(false)
const cvPdfPreview = `${cvPdf}#toolbar=1&navpanes=0&view=FitH`
</script>

<template>
  <main v-if="showPdf" class="cv-pdf-mode">
    <div class="pdf-toolbar">
      <button type="button" @click="showPdf = false">Terug naar CV</button>
      <a :href="cvPdf" download="cv-jelle-schrijvers.pdf">Download PDF</a>
    </div>

    <div class="pdf-viewer pdf-viewer--full">
      <object :data="cvPdfPreview" type="application/pdf">
        <p>
          Je browser kan de PDF-preview niet tonen.
          <a :href="cvPdf" target="_blank" rel="noreferrer">Open de PDF hier</a>.
        </p>
      </object>
    </div>
  </main>

  <main v-else class="cv-page">
    <aside class="cv-sidebar">
      <img class="cv-avatar" :src="profilePicture" alt="Jelle Schrijvers" />

      <div>
        <p class="cv-eyebrow">Curriculum vitae</p>
        <h1>Jelle Schrijvers</h1>
        <p class="cv-role">Student Graduaat Programmeren</p>
      </div>

      <section class="cv-panel">
        <h2>Info over mij</h2>
        <p>
          Ik ben student aan PXL-Digital waar ik het graduaat Programmeren volg.
          Ik heb een sterke interesse in softwareontwikkeling en het bouwen van
          eigen digitale projecten. Ik leer snel, denk analytisch en werk graag
          gestructureerd.
        </p>
      </section>

      <section class="cv-panel">
        <h2>Contact</h2>
        <div class="contact-list">
          <a href="tel:+32474028273">+32 474 02 82 73</a>
          <a href="mailto:jelleschrijvers07@gmail.com">jelleschrijvers07@gmail.com</a>
          <span>Oude Barrier 66, Beringen 3583</span>
        </div>
      </section>

      <section class="cv-panel">
        <h2>Socials</h2>
        <div class="social-list">
          <a href="https://github.com/JelleSchrijvers-PXL" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/jelleschrijvers/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://www.instagram.com/jelle_schrijvers/" target="_blank" rel="noreferrer">Instagram</a>
        </div>
      </section>

      <section class="cv-panel">
        <h2>PDF-versie</h2>
        <div class="pdf-actions">
          <button type="button" @click="showPdf = true">Open PDF</button>
          <a :href="cvPdf" download="cv-jelle-schrijvers.pdf">Download PDF</a>
        </div>
      </section>
    </aside>

    <section class="cv-content">
      <nav class="cv-nav" aria-label="CV navigatie">
        <a href="#werkervaring">Werkervaring</a>
        <a href="#opleiding">Opleiding</a>
        <a href="#vaardigheden">Vaardigheden</a>
        <a href="#hobbys">Hobby's</a>
        <a href="#talenkennis">Talen</a>
        <button type="button" @click="showPdf = true">PDF</button>
      </nav>

      <section id="werkervaring" class="cv-section">
        <h2>Werkervaring</h2>
        <div class="cards-grid">
          <article v-for="job in workExperience" :key="`${job.company}-${job.period}`" class="cv-card">
            <h3>{{ job.title }}</h3>
            <div class="meta-row">
              <span>{{ job.company }}</span>
              <strong>{{ job.period }}</strong>
            </div>
            <p>{{ job.description }}</p>
          </article>
        </div>
      </section>

      <section id="opleiding" class="cv-section">
        <h2>Opleiding</h2>
        <article class="cv-card cv-card--wide">
          <h3>PXL-Digital</h3>
          <div class="meta-row">
            <span>Graduaat Programmeren</span>
            <strong>September 2025 - Juni 2027</strong>
          </div>
          <p>Vaardigheden: C#, HTML, CSS, JavaScript, SQL, Git en GitHub.</p>
        </article>
      </section>

      <section id="vaardigheden" class="cv-section">
        <h2>Vaardigheden</h2>
        <h3 class="subheading">Hard skills</h3>
        <div class="cards-grid">
          <article v-for="skill in hardSkills" :key="skill.title" class="cv-card">
            <h3>{{ skill.title }}</h3>
            <div class="chip-list">
              <span v-for="item in skill.items" :key="item">{{ item }}</span>
            </div>
          </article>
        </div>

        <h3 class="subheading">Soft skills</h3>
        <div class="cards-grid">
          <article v-for="skill in softSkills" :key="skill.title" class="cv-card">
            <h3>{{ skill.title }}</h3>
            <div class="chip-list">
              <span v-for="item in skill.items" :key="item">{{ item }}</span>
            </div>
          </article>
        </div>
      </section>

      <section id="hobbys" class="cv-section">
        <h2>Hobby's</h2>
        <div class="cards-grid">
          <article class="cv-card">
            <h3>Basketbal</h3>
            <p>
              Vijf jaar geleden ben ik begonnen met basketballen. Sindsdien speel
              ik bij de herenploegen van Laakdal. Ik train twee keer per week en
              neem, afhankelijk van het speelschema, deel aan een of twee wedstrijden.
            </p>
            <img class="hobby-image" :src="basketballImage" alt="Basketbalwedstrijd" />
          </article>
          <article class="cv-card">
            <h3>Fitness</h3>
            <p>
              Naast basketbal ga ik vijf keer per week naar de fitness. Ik focus
              op krachttraining om mijn fysieke weerbaarheid te vergroten en beter
              te kunnen presteren.
            </p>
          </article>
        </div>
      </section>

      <section id="talenkennis" class="cv-section">
        <h2>Talen</h2>
        <div class="language-grid">
          <article v-for="language in languages" :key="language.name" class="language-card">
            <div>
              <h3>{{ language.name }}</h3>
              <p>{{ language.level }}</p>
            </div>
            <div class="language-bar" :aria-label="`${language.name}: ${language.level}`">
              <span :style="{ width: `${language.value}%` }"></span>
            </div>
          </article>
        </div>
      </section>
    </section>
  </main>
</template>

<style scoped>
.cv-page {
  display: grid;
  grid-template-columns: 320px minmax(0, 1fr);
  gap: 2rem;
  max-width: 1220px;
  margin: 0 auto;
  padding: 2.5rem 0 4rem;
  color: var(--color-text);
}

.cv-sidebar {
  position: sticky;
  top: calc(var(--header-height) + 1.5rem);
  align-self: start;
  display: grid;
  gap: 1.2rem;
  padding: 1.5rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: linear-gradient(180deg, rgba(56, 189, 248, 0.28), rgba(17, 24, 39, 0.92));
  box-shadow: var(--shadow-soft);
}

.cv-avatar {
  width: 8.5rem;
  height: 8.5rem;
  border: 3px solid rgba(255, 255, 255, 0.28);
  border-radius: 50%;
  object-fit: cover;
}

.cv-eyebrow {
  color: var(--color-accent);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.cv-sidebar h1 {
  color: var(--color-heading);
  font-size: 2rem;
  font-weight: 850;
  line-height: 1.05;
}

.cv-role,
.cv-panel p,
.contact-list span {
  color: var(--color-text);
}

.cv-panel {
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.18);
}

.cv-panel h2 {
  margin-bottom: 0.55rem;
  color: var(--color-heading);
  font-size: 0.9rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.contact-list,
.social-list,
.pdf-actions {
  display: grid;
  gap: 0.55rem;
}

.contact-list a,
.social-list a,
.pdf-actions a,
.pdf-actions button {
  color: #ffffff;
  overflow-wrap: anywhere;
  text-decoration: none;
}

.contact-list a:hover,
.social-list a:hover,
.pdf-actions a:hover,
.pdf-actions button:hover {
  color: var(--color-accent);
}

.pdf-actions a,
.pdf-actions button {
  display: inline-flex;
  width: fit-content;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 999px;
  background: transparent;
  cursor: pointer;
  font: inherit;
  font-weight: 750;
  padding: 0.45rem 0.75rem;
}

.cv-content {
  display: grid;
  gap: 2rem;
  min-width: 0;
}

.cv-nav {
  position: sticky;
  top: calc(var(--header-height) + 0.75rem);
  z-index: 5;
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  padding: 0.7rem;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  background: rgba(10, 15, 23, 0.86);
  backdrop-filter: blur(14px);
}

.cv-nav a,
.cv-nav button {
  border-radius: 999px;
  border: 0;
  background: transparent;
  color: var(--color-text);
  cursor: pointer;
  font: inherit;
  font-size: 0.9rem;
  font-weight: 750;
  padding: 0.45rem 0.8rem;
  text-decoration: none;
}

.cv-nav a:hover,
.cv-nav button:hover {
  background: var(--color-accent-soft);
  color: var(--color-heading);
}

.cv-section {
  scroll-margin-top: 150px;
}

.cv-section h2 {
  margin-bottom: 1.2rem;
  color: var(--color-heading);
  font-size: 2rem;
  font-weight: 850;
}

.subheading {
  margin: 1.5rem 0 0.9rem;
  color: var(--color-accent);
  font-size: 1rem;
  font-weight: 800;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
}

.cv-card,
.language-card {
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: rgba(17, 24, 39, 0.76);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);
  padding: 1.25rem;
}

.cv-card--wide {
  max-width: 720px;
}

.cv-card h3,
.language-card h3 {
  margin-bottom: 0.55rem;
  color: var(--color-heading);
  font-size: 1.08rem;
  font-weight: 800;
}

.cv-card p,
.language-card p {
  color: var(--color-text);
  line-height: 1.7;
}

.meta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem 1rem;
  justify-content: space-between;
  margin-bottom: 0.7rem;
  color: var(--color-accent);
  font-size: 0.9rem;
}

.meta-row span,
.meta-row strong {
  font-weight: 800;
}

.chip-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.chip-list span {
  border: 1px solid var(--color-border);
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.1);
  color: var(--color-text);
  font-size: 0.88rem;
  font-weight: 650;
  padding: 0.35rem 0.65rem;
}

.hobby-image {
  width: 100%;
  height: 210px;
  margin-top: 1rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  object-fit: cover;
}

.language-grid {
  display: grid;
  gap: 1rem;
}

.language-card {
  display: grid;
  gap: 0.85rem;
}

.language-bar {
  height: 0.75rem;
  overflow: hidden;
  border-radius: 999px;
  background: rgba(148, 163, 184, 0.18);
}

.language-bar span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--color-accent), var(--color-green));
}

.pdf-viewer {
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: rgba(17, 24, 39, 0.76);
  box-shadow: var(--shadow-soft);
}

.pdf-viewer object {
  display: block;
  width: 100%;
  min-height: 760px;
  border: 0;
}

.pdf-viewer p {
  padding: 1.25rem;
  color: var(--color-text);
}

.pdf-viewer a {
  color: var(--color-accent);
}

.cv-pdf-mode {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  gap: 1rem;
  width: min(100%, 980px);
  min-height: calc(100vh - var(--header-height) - 2.5rem);
  margin: 0 auto;
  padding: 1.25rem 0 1.75rem;
}

.pdf-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
  justify-content: space-between;
}

.pdf-toolbar button,
.pdf-toolbar a {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  background: rgba(17, 24, 39, 0.76);
  color: var(--color-accent);
  cursor: pointer;
  font: inherit;
  font-weight: 800;
  padding: 0.65rem 0.95rem;
  text-decoration: none;
}

.pdf-toolbar button:hover,
.pdf-toolbar a:hover {
  border-color: var(--color-border-hover);
  background: var(--color-accent-soft);
}

.pdf-viewer--full object {
  height: 100%;
  min-height: 0;
}

.pdf-viewer--full {
  height: calc(100vh - var(--header-height) - 7rem);
  min-height: 520px;
  max-height: 860px;
}

@media (max-width: 920px) {
  .cv-page {
    grid-template-columns: 1fr;
  }

  .cv-sidebar,
  .cv-nav {
    position: static;
  }

  .pdf-viewer object {
    min-height: 560px;
  }

  .cv-pdf-mode {
    padding: 1rem 0 2rem;
  }

  .pdf-viewer--full {
    height: 72vh;
    min-height: 420px;
  }

  .pdf-viewer--full object {
    min-height: 0;
  }
}
</style>
