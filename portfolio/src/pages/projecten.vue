<script setup>
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
</script>

<template>
  <div class="project-page">
    <button @click="router.back()">← Terug</button>

    <!-- Scratch -->
    <div v-if="route.params.id === 'scratch'">
      <h1>Scratch</h1>
      
    </div>

    <!-- POP Reflectie -->
    <div v-else-if="route.params.id === 'POP-reflectie'">
      <h1>POP: AIM-reflectie op scratchproject</h1>
    </div>

    <!-- Planning -->
    <div v-else-if="route.params.id === 'planning'">
      <h1>POP: planning</h1>
    </div>

    <!-- Reflectie PE C#1 -->
    <div v-else-if="route.params.id === 'reflectie-PE-C1'">
      <h1>Reflectie PE: C# Console</h1>
    </div>

    <!-- Werkveldverkenning -->
    <div v-else-if="route.params.id === 'werkveldverkenning'">
      <h1>Werkveldverkenning</h1>
    </div>

    <!-- Reflectie PE Debugging -->
    <div v-else-if="route.params.id === 'reflectie-PE-debugging'">
      <h1>Reflectie PE: Debugging (C#)</h1>
    </div>

    <!-- SDG's -->
    <div v-else-if="route.params.id === 'reflectie-SDGs'">
      <h1>Reflectie: SDG's</h1>
    </div>

    <!-- CV -->
    <div v-else-if="route.params.id === 'CV'">
      <h1>Curriculum Vitae</h1>
    </div>

    <!-- Portfolio -->
    <div v-else-if="route.params.id === 'portfolio'">
      <h1>Portfolio</h1>
    </div>

    <!-- PE: LDB -->
    <div v-else-if="route.params.id === 'LDB'">
      <h1>LockDown Browser (LDB)</h1>
    </div>

    <!-- PE: GIT -->
    <div v-else-if="route.params.id === 'GIT'">
      <h1>GIT & GitHub</h1>
    </div>

    <!-- PE: Gastsprekers -->
    <div v-else-if="route.params.id === 'gastsprekers'">
      <h1>Reflectie gastsprekers</h1>
    </div>

    <!-- PE: Console -->
    <div v-else-if="route.params.id === 'console-PE'">
      <h1>C# Console</h1>
    </div>

    <!-- PE: HTML & CSS -->
    <div v-else-if="route.params.id === 'webdevelopment'">
      <h1>HTML & CSS</h1>
    </div>

    <!-- PE: Debugging -->
    <div v-else-if="route.params.id === 'debugging'">
      <h1>Debugging (C#)</h1>
    </div>

    <!-- PE: WPF -->
    <div v-else-if="route.params.id === 'WPF'">
      <h1>C# WPF</h1>
    </div>

    <div v-else>
      <p>Project niet gevonden.</p>
    </div>
  </div>
</template>