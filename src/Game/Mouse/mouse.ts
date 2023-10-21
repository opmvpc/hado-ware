import { Vector2 } from "../Math/Vector2";
import { camera } from "../game";

export enum MouseButtonCode {
  PrimaryButton = "PrimaryButton",
  SecondaryButton = "SecondaryButton",
  AuxiliaryButton = "AuxiliaryButton",
  BackButton = "BackButton",
  ForwardButton = "ForwardButton",
}

type PressedMouseButtonsMap = Map<MouseButtonCode, MouseButtonCode>;

export const pressedMouseButtons: PressedMouseButtonsMap = new Map();

export const previousFramePressedMouseButtons: PressedMouseButtonsMap =
  new Map();

export let mousePos = new Vector2(0, 0);

export const savePreviousFramePressedMouseButtons = () => {
  previousFramePressedMouseButtons.clear();
  pressedMouseButtons.forEach((value, key) => {
    previousFramePressedMouseButtons.set(key, value);
  });
};

export const pressedMouseButtonsDiff = (): PressedMouseButtonsMap => {
  const diffMap = new Map();

  const diffArray = [...pressedMouseButtons.keys()].filter((button) =>
    previousFramePressedMouseButtons.has(button)
  );

  for (let index = 0; index < diffArray.length; index++) {
    const element = diffArray[index];
    diffMap.set(element, element);
  }

  return diffMap;
};

export const handleMouseDown = (event: MouseEvent) => {
  if (event.buttons & 0b00001) {
    pressedMouseButtons.set(
      MouseButtonCode.PrimaryButton,
      MouseButtonCode.PrimaryButton
    );
  }
  if (event.buttons & 0b00010) {
    pressedMouseButtons.set(
      MouseButtonCode.SecondaryButton,
      MouseButtonCode.SecondaryButton
    );
  }
  if (event.buttons & 0b00100) {
    pressedMouseButtons.set(
      MouseButtonCode.AuxiliaryButton,
      MouseButtonCode.AuxiliaryButton
    );
  }
  if (event.buttons & 0b01000) {
    pressedMouseButtons.set(
      MouseButtonCode.BackButton,
      MouseButtonCode.BackButton
    );
  }
  if (event.buttons & 0b10000) {
    pressedMouseButtons.set(
      MouseButtonCode.ForwardButton,
      MouseButtonCode.ForwardButton
    );
  }
  console.log(pressedMouseButtons);
};

export const handleMouseUp = (event: MouseEvent) => {
  console.log(event.buttons);
  if ((event.buttons & 0b00001) === 0) {
    pressedMouseButtons.delete(MouseButtonCode.PrimaryButton);
  }
  if ((event.buttons & 0b00010) === 0) {
    pressedMouseButtons.delete(MouseButtonCode.SecondaryButton);
  }
  if ((event.buttons & 0b00100) === 0) {
    pressedMouseButtons.delete(MouseButtonCode.AuxiliaryButton);
  }
  if ((event.buttons & 0b01000) === 0) {
    pressedMouseButtons.delete(MouseButtonCode.BackButton);
  }
  if ((event.buttons & 0b10000) === 0) {
    pressedMouseButtons.delete(MouseButtonCode.ForwardButton);
  }
  console.log(pressedMouseButtons);
};

export const updateMousePos = (event: MouseEvent) => {
  const screenMousePos = new Vector2(event.pageX, event.pageY);
  mousePos = camera.screenToworldSpace(screenMousePos);
};

export const handleClick = (event: MouseEvent) => {};
