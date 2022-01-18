import { DialogType } from "@app-enums";

export class GamePopupHandlerError extends Error {
  constructor(message: string, public dialogType: DialogType) {
    super(message);
  }
}
