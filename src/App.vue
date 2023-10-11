<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;

let requestId: number;
let startTimeStamp: number;

const doThings = () => {
  const leCanvas = document.querySelector("canvas");
  if (leCanvas === null) {
    return;
  }

  canvas = leCanvas;

  canvas.height = document.body.clientHeight;
  canvas.width = document.body.clientWidth;

  const leCtx = canvas.getContext("2d");
  if (leCtx === null) {
    return;
  }

  ctx = leCtx;

  ctx.fillStyle = "green";
  ctx.fillRect(10, 10, 150, 100);
};

const step = (timeStamp: number) => {
  const delta = timeStamp - startTimeStamp / 1000;
  window.requestAnimationFrame(step);
};

const handleResize = () => {
  if (canvas === null) {
  }
  canvas.height = document.body.clientHeight;
  canvas.width = document.body.clientWidth;
};

onMounted(() => {
  doThings();

  window.addEventListener("resize", handleResize);

  window.requestAnimationFrame(step);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<template>
  <canvas ref="canvas"></canvas>
</template>
