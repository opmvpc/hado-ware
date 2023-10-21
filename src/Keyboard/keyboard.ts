export enum KeyCode {
  ArrowUp = "ArrowUp",
  ArrowDown = "ArrowDown",
  ArrowLeft = "ArrowLeft",
  ArrowRight = "ArrowRight",
}

export const pressedKeys: Map<KeyCode, KeyCode> = new Map();

export const handleKeyDown = (event: KeyboardEvent) => {
  const code = event.code as KeyCode;
  pressedKeys.set(code, code);
};

export const handleKeyUp = (event: KeyboardEvent) => {
  const code = event.code as KeyCode;
  pressedKeys.delete(code);
};
