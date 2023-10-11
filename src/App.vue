<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { GameMap } from "./type";
import { Vector2 } from "./math";

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;

let requestId: number;
let previousTimeStamp: number;

const map: GameMap = {
  greenSquare: {
    position: new Vector2(10, 10),
  },
};

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
};

const step = (timeStamp: number) => {
  if (previousTimeStamp === undefined) {
    previousTimeStamp = timeStamp;
  }
  const delta = (timeStamp - previousTimeStamp) / 1000;
  previousTimeStamp = timeStamp;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  map.greenSquare.position = map.greenSquare.position.add(
    new Vector2(delta * 10, delta * 0)
  );

  ctx.fillStyle = "green";
  ctx.fillRect(
    map.greenSquare.position.x,
    map.greenSquare.position.y,
    150,
    100
  );
  window.requestAnimationFrame(step);
};

const handleResize = () => {
  if (canvas === null) {
  }
  canvas.height = document.body.clientHeight;
  canvas.width = document.body.clientWidth;
};

const handleMoves = () => {
  document.body.addEventListener("keydown", (event: KeyboardEvent) => {
    enum KeyCode {
      ArrowUp = "ArrowUp",
      ArrowDown = "ArrowDown",
      ArrowLeft = "ArrowLeft",
      ArrowRight = "ArrowRight",
    }
    const eventCode: KeyCode = event.code as KeyCode;
    if (eventCode === KeyCode.ArrowUp) {
    }
  });
};

onMounted(() => {
  doThings();

  window.addEventListener("resize", handleResize);

  requestId = window.requestAnimationFrame(step);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<template>
  <canvas ref="canvas"></canvas>
</template>
