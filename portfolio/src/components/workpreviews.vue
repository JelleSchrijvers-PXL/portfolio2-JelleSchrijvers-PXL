<script setup>
// Helper functie voor assets in src/assets/foto/
const img = (bestand) =>
  new URL(`../assets/foto/${bestand}`, import.meta.url).href;

const opdrachten = [
  {
    id: "scratch",
    title: "Scratch",
    image: img("scratch-foto-inleinding.png"),
    alt: "foto van scratch project",
  },
  {
    id: "POP-reflectie",
    title: "POP: AIM-reflectie op scratchproject",
    image: img("preview-aim-reflectie.png"),
    alt: "foto van reflectie scratch",
  },
  {
    id: "planning",
    title: "POP: planning",
    image: img("Preview-POP-planning.png"),
    alt: "foto van pop planning",
  },
  {
    id: "reflectie-PE-C1",
    title: "Reflectie PE: C# Console",
    image: img("preview-relfectie-C1.png"),
    alt: "foto van reflectie C# console",
  },
  {
    id: "werkveldverkenning",
    title: "Werkveldverkenning",
    image: img("preview-werkveldverkenning.png"),
    alt: "foto van werkveldverkenning",
  },
  {
    id: "reflectie-PE-debugging",
    title: "Reflectie PE: Debugging (C#)",
    image: img("preview-reflectie-debugging.png"),
    alt: "foto van reflectie debugging",
  },
  {
    id: "reflectie-SDGs",
    title: "Reflectie: SDG's",
    image: img("preview-reflectie-sdg.png"),
    alt: "foto van reflectie SDG's",
  },
  {
    id: "CV",
    title: "Curriculum Vitae",
    image: img("cv-foto-inleiding.png"),
    alt: "foto van CV project",
  },
  {
    id: "portfolio",
    title: "Portfolio",
    image: img("preview-portfolio.png"),
    alt: "foto van portfolio",
  },
];

const pes = [
  {
    id: "LDB",
    title: "LockDown Browser (LDB)",
    image: img("preview-ldb.png"),
    alt: "foto van LockDown Browser",
  },
  {
    id: "GIT",
    title: "GIT & GitHub",
    image: img("preview-Git.png"),
    alt: "foto van git PE",
  },
  {
    id: "gastsprekers",
    title: "Reflectie gastsprekers",
    image: img("preview-gastspreker (1).jpg"),
    alt: "foto van reflectie gastsprekers",
  },
  {
    id: "console-PE",
    title: "C# Console",
    image: img("preview-PE-Console.png"),
    alt: "foto van PE console",
  },
  {
    id: "webdevelopment",
    title: "HTML & CSS",
    image: img("preview-html&css.png"),
    alt: "foto van PE html&css",
  },
  {
    id: "debugging",
    title: "Debugging (C#)",
    image: img("preview-debugging.png"),
    alt: "foto van PE debugging",
  },
  {
    id: "WPF",
    title: "C# WPF",
    image: img("preview-wpf.png"),
    alt: "foto van PE WPF",
  },
];
</script>

<template>
  <div class="container-work">
    <!-- Opdrachten -->
    <div class="container-projecten">
      <h2>Opdrachten</h2>
      <section
        v-for="item in opdrachten"
        :key="item.id"
        :id="item.id"
        class="opdrachten"
      >
        <div class="container-opdrachten">
          <router-link :to="`/project/${item.id}`">
            <article class="opdracht">
              <h3>{{ item.title }}</h3>
              <img :src="item.image" :alt="item.alt" />
            </article>
          </router-link>
        </div>
      </section>
    </div>

    <!-- PE's -->
    <div class="containter-PE">
      <h2>PE's</h2>
      <section
        v-for="item in pes"
        :key="item.id"
        :id="item.id"
        class="opdrachten"
      >
        <div class="container-opdrachten">
          <router-link :to="`/project/${item.id}`">
            <article class="opdracht">
              <h3>{{ item.title }}</h3>
              <img :src="item.image" :alt="item.alt" />
            </article>
          </router-link>
        </div>
      </section>
    </div>
  </div>
</template>