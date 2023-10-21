<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { setup, run, addEventListeners, removeEventListeners } from "./game";

onMounted(() => {
  setup();
  addEventListeners();
  run();
});

onUnmounted(() => {
  removeEventListeners();
});
</script>

<template>
  <canvas ref="canvas"></canvas>
</template>
