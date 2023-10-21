import { Vector2 } from "./Math/Vector2";

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
