export enum MouseButtonCode {
  PrimaryButton = "PrimaryButton",
  SecondaryButton = "SecondaryButton",
  AuxiliaryButton = "AuxiliaryButton",
  BackButton = "BackButton",
  ForwardButton = "ForwardButton",
}

export const previousFramePressedMouseButtons: Map<
  MouseButtonCode,
  MouseButtonCode
> = new Map();

export const pressedMouseButtons: Map<MouseButtonCode, MouseButtonCode> =
  new Map();

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

export const handleClick = (event: MouseEvent) => {};
