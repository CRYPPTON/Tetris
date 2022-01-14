import { ErrorHandler, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DialogType } from '@app-enums';
import { DialogService } from '@app-services';
import { GamePopupHandlerError } from '@app-popup-handlers';

@Injectable()
export class GamePopupHandler implements ErrorHandler {
  constructor(
    private dialogService: DialogService,
    private translationService: TranslateService,
  ) { }

  handleError = async (error: any): Promise<void> => {
    if (error instanceof GamePopupHandlerError) {
      const result = await this.dialogService.showDialog(
        error.message,
        DialogType.game
      );
      if (result) {
        //... play new.
      } else {
        //... end game.
      }
    } else {
      this.dialogService.showDialog(
        this.translationService.instant('popup-content.unknown'),
        DialogType.unknown
      );
    }
  }
}
