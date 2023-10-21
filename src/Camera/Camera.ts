import { Vector2 } from "../Math/Vector2";

export class Camera {
  public h: number = 0;
  public aspectRatio: number = 0;

  constructor(
    public position: Vector2 = new Vector2(0, 0),
    public w: number = 50,
    public vw: number = 0,
    public vh: number = 0
  ) {
    this.setAspectRatio();
    this.setH();
  }

  worldToScreenSpace(worldPoint: Vector2) {
    const l = this.position.x - this.w / 2;
    const b = this.position.y - this.h / 2;

    const camX = (worldPoint.x - l) / this.w;
    const camY = 1 - (worldPoint.y - b) / this.h;

    const screenX = camX * this.vw;
    const screenY = camY * this.vh;

    return new Vector2(screenX, screenY);
  }

  screenToworldSpace(screenPoint: Vector2) {
    const camX = screenPoint.x / this.vw;
    const camY = screenPoint.y / this.vh;

    const l = this.position.x - this.w / 2;
    const b = this.position.y - this.h / 2;

    const worldPointX = camX * this.w + l;
    const worldPointY = (camY - 1) * -this.h + b;

    return new Vector2(worldPointX, worldPointY);
  }

  resizeViewport(w: number, h: number): void {
    this.vw = w;
    this.vh = h;
    this.setAspectRatio();
    this.setH();
  }

  setAspectRatio(): void {
    this.aspectRatio = this.vh / this.vw;
  }

  setH(): void {
    this.h = this.aspectRatio * this.w;
  }
}
