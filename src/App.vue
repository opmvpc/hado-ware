<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { GameMap, KeyCode } from "./type";
import { Vector2 } from "./math";

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
const screenHeight = document.body.clientHeight;
const screenWidth = document.body.clientWidth;

let requestId: number;
let previousTimeStamp: number;

const map: GameMap = {
  greenSquare: {
    position: new Vector2(10, 10),
    size: new Vector2(150, 100),
  },
};

const pressedKeys: Map<KeyCode, KeyCode> = new Map();

const doThings = () => {
  const leCanvas = document.querySelector("canvas");
  if (leCanvas === null) {
    return;
  }

  canvas = leCanvas;

  canvas.height = screenHeight;
  canvas.width = screenWidth;

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
  let direction: Vector2 = new Vector2(0, 0);
  const speed: number = 500;

  if (pressedKeys.size > 0) {
    if (pressedKeys.has(KeyCode.ArrowUp)) {
      direction.y -= 1;
    }
    if (pressedKeys.has(KeyCode.ArrowDown)) {
      direction.y += 1;
    }
    if (pressedKeys.has(KeyCode.ArrowLeft)) {
      direction.x -= 1;
    }
    if (pressedKeys.has(KeyCode.ArrowRight)) {
      direction.x += 1;
    }
  }

  let movement = direction.normalizeMove();
  movement = movement.mul(delta * speed);

  map.greenSquare.position = map.greenSquare.position.add(movement);
  map.greenSquare.position = map.greenSquare.position.clamp(
    new Vector2(0, 0),
    new Vector2(
      screenWidth - map.greenSquare.size.x,
      screenHeight - map.greenSquare.size.y
    )
  );

  ctx.fillStyle = "green";
  ctx.fillRect(
    map.greenSquare.position.x,
    map.greenSquare.position.y,
    map.greenSquare.size.x,
    map.greenSquare.size.y
  );
  window.requestAnimationFrame(step);
};

const handleResize = () => {
  if (canvas === null) {
  }
  canvas.height = document.body.clientHeight;
  canvas.width = document.body.clientWidth;
};

const handleKeyDown = (event: KeyboardEvent) => {
  const code = event.code as KeyCode;
  pressedKeys.set(code, code);
};

const handleKeyUp = (event: KeyboardEvent) => {
  const code = event.code as KeyCode;
  pressedKeys.delete(code);
};

onMounted(() => {
  doThings();

  window.addEventListener("resize", handleResize);
  document.body.addEventListener("keydown", handleKeyDown);
  document.body.addEventListener("keyup", handleKeyUp);

  requestId = window.requestAnimationFrame(step);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<template>
  <canvas ref="canvas"></canvas>
</template>
