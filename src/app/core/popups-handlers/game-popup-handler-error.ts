import { DialogType } from "src/app/shared/enums";

export class GamePopupHandlerError extends Error {
  constructor(message: string, public dialogType: DialogType) {
    super(message);
  }
}
