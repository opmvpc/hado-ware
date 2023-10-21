import { expect, it, assertType } from "vitest";
import { Camera } from "./Camera";
import { Vector2 } from "../Math/Vector2";

it("is a Camera", () => {
  const cam = new Camera(new Vector2(0, 0), 10, 1920, 1080);
  assertType<Camera>(cam);
});

it("can convert world to screen position", () => {
  const cam = new Camera(new Vector2(5, 5), 10, 2160, 1080);
  const center = cam.worldToScreenSpace(new Vector2(5, 5));
  expect(center.x).toBe(1080);
  expect(center.y).toBe(540);

  const point = cam.worldToScreenSpace(new Vector2(10, 5));
  expect(point.x).toBe(2160);
  expect(point.y).toBe(540);

  const point2 = cam.worldToScreenSpace(new Vector2(5, 2.5));
  expect(point2.x).toBe(1080);
  expect(point2.y).toBe(1080);

  const point3 = cam.worldToScreenSpace(new Vector2(5, 7.5));
  expect(point3.x).toBe(1080);
  expect(point3.y).toBe(0);

  const point4 = cam.worldToScreenSpace(new Vector2(5, 10));
  expect(point4.x).toBe(1080);
  expect(point4.y).toBe(-540);
});

it("can convert screen to world position", () => {
  const cam = new Camera(new Vector2(5, 5), 10, 2160, 1080);
  const center = cam.screenToworldSpace(new Vector2(1080, 540));
  expect(center.x).toBeCloseTo(5);
  expect(center.y).toBeCloseTo(5);

  const point = cam.screenToworldSpace(new Vector2(2160, 540));
  expect(point.x).toBeCloseTo(10);
  expect(point.y).toBeCloseTo(5);

  const point2 = cam.screenToworldSpace(new Vector2(1080, 1080));
  expect(point2.x).toBe(5);
  expect(point2.y).toBe(2.5);

  const point3 = cam.screenToworldSpace(new Vector2(1080, 0));
  expect(point3.x).toBe(5);
  expect(point3.y).toBe(7.5);

  const point4 = cam.screenToworldSpace(new Vector2(1080, -540));
  expect(point4.x).toBe(5);
  expect(point4.y).toBe(10);
});
