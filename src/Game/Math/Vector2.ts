export class Vector2 {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(vector: Vector2): Vector2 {
    return new Vector2(this.x + vector.x, this.y + vector.y);
  }

  sub(vector: Vector2): Vector2 {
    return new Vector2(this.x - vector.x, this.y - vector.y);
  }

  mul(n: number): Vector2 {
    return new Vector2(this.x * n, this.y * n);
  }

  normalizeMove(): Vector2 {
    if (this.x === 0 && this.y === 0) {
      return new Vector2(0, 0);
    }
    const hypotenuse = this.magnitude();
    return new Vector2(this.x / hypotenuse, this.y / hypotenuse);
  }

  magnitude(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  clamp(min: Vector2, max: Vector2): Vector2 {
    return this.min(max).max(min);
  }

  min(vector: Vector2): Vector2 {
    return new Vector2(Math.min(vector.x, this.x), Math.min(vector.y, this.y));
  }

  max(vector: Vector2): Vector2 {
    return new Vector2(Math.max(vector.x, this.x), Math.max(vector.y, this.y));
  }
}
