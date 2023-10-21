<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { GameMap } from "./types";
import {
  KeyCode,
  handleKeyDown,
  handleKeyUp,
  pressedKeys,
} from "./Keyboard/keyboard";
import {
  MouseButtonCode,
  handleMouseDown,
  handleMouseUp,
  pressedMouseButtons,
  previousFramePressedMouseButtons,
  handleClick,
} from "./Mouse/mouse";
import { Vector2 } from "./Math/Vector2";
import { Camera } from "./Camera/Camera";

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;

let requestId: number;
let previousTimeStamp: number;

const camera = new Camera();

const map: GameMap = {
  greenSquare: {
    position: new Vector2(0, 0),
    size: new Vector2(4, 2),
  },
};

const setup = () => {
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

  camera.resizeViewport(canvas.width, canvas.height);
};

const update = (timeStamp: number) => {
  if (previousTimeStamp === undefined) {
    previousTimeStamp = timeStamp;
  }
  const delta = (timeStamp - previousTimeStamp) / 1000;
  previousTimeStamp = timeStamp;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let direction: Vector2 = new Vector2(0, 0);
  const speed: number = 50;

  if (pressedKeys.size > 0) {
    if (pressedKeys.has(KeyCode.ArrowUp)) {
      direction.y += 1;
    }
    if (pressedKeys.has(KeyCode.ArrowDown)) {
      direction.y -= 1;
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

  ctx.fillStyle = "green";

  const topLeftSquarePos = camera.worldToScreenSpace(map.greenSquare.position);

  const botomRightSquarePos = camera.worldToScreenSpace(
    map.greenSquare.position.add(map.greenSquare.size)
  );

  const screenSpaceSquareSize = botomRightSquarePos.sub(topLeftSquarePos);

  ctx.fillRect(
    topLeftSquarePos.x,
    topLeftSquarePos.y,
    screenSpaceSquareSize.x,
    screenSpaceSquareSize.y
  );
  window.requestAnimationFrame(update);
};

const handleResize = () => {
  if (canvas === null) {
  }

  canvas.height = document.body.clientHeight;
  canvas.width = document.body.clientWidth;

  camera.resizeViewport(canvas.width, canvas.height);
};

onMounted(() => {
  setup();

  window.addEventListener("resize", handleResize);
  document.body.addEventListener("keydown", handleKeyDown);
  document.body.addEventListener("keyup", handleKeyUp);
  document.body.addEventListener("mouseup", handleMouseUp);
  document.body.addEventListener("mousedown", handleMouseDown);
  document.body.addEventListener("click", handleClick);
  window.oncontextmenu = () => false;

  requestId = window.requestAnimationFrame(update);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
  document.body.removeEventListener("keydown", handleKeyDown);
  document.body.removeEventListener("keyup", handleKeyUp);
  document.body.removeEventListener("mouseup", handleMouseUp);
  document.body.removeEventListener("mousedown", handleMouseDown);
  document.body.removeEventListener("click", handleClick);
});
</script>

<template>
  <canvas ref="canvas"></canvas>
</template>
