import { Vector2 } from "./math";

export enum KeyCode {
  ArrowUp = "ArrowUp",
  ArrowDown = "ArrowDown",
  ArrowLeft = "ArrowLeft",
  ArrowRight = "ArrowRight",
}

export interface GameMap {
  greenSquare: {
    position: Vector2;
    size: Vector2;
  };
}
