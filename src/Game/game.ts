import { GameMap } from "./types";
import {
  KeyCode,
  handleKeyDown,
  handleKeyUp,
  pressedKeys,
} from "./Keyboard/keyboard";
import {
  MouseButtonCode,
  mousePos,
  handleMouseDown,
  handleMouseUp,
  pressedMouseButtons,
  previousFramePressedMouseButtons,
  handleClick,
  savePreviousFramePressedMouseButtons,
  pressedMouseButtonsDiff,
  updateMousePos,
} from "./Mouse/mouse";
import { Vector2 } from "./Math/Vector2";
import { Camera } from "./Camera/Camera";

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;

export let requestId: number;
let previousTimeStamp: number;

export const camera = new Camera();

const map: GameMap = {
  greenSquare: {
    position: new Vector2(0, 0),
    size: new Vector2(4, 2),
  },
};

let moveToPos: Vector2 | null = null;

export const setup = () => {
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

export const draw = (timeStamp: number) => {
  if (previousTimeStamp === undefined) {
    previousTimeStamp = timeStamp;
  }
  const delta = (timeStamp - previousTimeStamp) / 1000;
  previousTimeStamp = timeStamp;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let direction: Vector2 = new Vector2(0, 0);
  const speed: number = 50;

  if (pressedMouseButtons.has(MouseButtonCode.SecondaryButton)) {
    moveToPos = mousePos;
    console.log(moveToPos);
  }

  if (moveToPos !== null) {
    if (moveToPos.x > map.greenSquare.position.x) {
      direction.x += moveToPos.x % 1;
    } else if (moveToPos.x < map.greenSquare.position.x) {
      direction.x -= moveToPos.x % 1;
    }
    if (moveToPos.y > map.greenSquare.position.y) {
      direction.y += moveToPos.y % 1;
    } else if (moveToPos.y < map.greenSquare.position.y) {
      direction.y -= moveToPos.y % 1;
    }

    if (
      moveToPos.x === map.greenSquare.position.x &&
      moveToPos.y === map.greenSquare.position.y
    ) {
      moveToPos = null;
    }
  }

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
  savePreviousFramePressedMouseButtons();
  window.requestAnimationFrame(draw);
};

export const handleResize = () => {
  if (canvas === null) {
  }

  canvas.height = document.body.clientHeight;
  canvas.width = document.body.clientWidth;

  camera.resizeViewport(canvas.width, canvas.height);
};

export const addEventListeners = () => {
  window.addEventListener("resize", handleResize);
  document.body.addEventListener("keydown", handleKeyDown);
  document.body.addEventListener("keyup", handleKeyUp);
  document.body.addEventListener("mouseup", handleMouseUp);
  document.body.addEventListener("mousedown", handleMouseDown);
  document.body.addEventListener("click", handleClick);
  canvas.addEventListener("mousemove", updateMousePos);
  canvas.addEventListener("mouseenter", updateMousePos);
  canvas.addEventListener("mouseleave", updateMousePos);

  window.oncontextmenu = () => false;
};

export const removeEventListeners = () => {
  window.removeEventListener("resize", handleResize);
  document.body.removeEventListener("keydown", handleKeyDown);
  document.body.removeEventListener("keyup", handleKeyUp);
  document.body.removeEventListener("mouseup", handleMouseUp);
  document.body.removeEventListener("mousedown", handleMouseDown);
  document.body.removeEventListener("click", handleClick);
  canvas.removeEventListener("mousemove", updateMousePos);
  canvas.removeEventListener("mouseenter", updateMousePos);
  canvas.removeEventListener("mouseleave", updateMousePos);
};

export const run = () => {
  requestId = window.requestAnimationFrame(draw);
};
