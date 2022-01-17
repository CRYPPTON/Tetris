import { ErrorHandler, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DialogType } from '@app-enums';
import { DialogService, GameEngineService } from '@app-services';
import { GamePopupHandlerError } from '@app-popup-handlers';

@Injectable()
export class GamePopupHandler implements ErrorHandler {
  constructor(
    private gameEngineServices: GameEngineService,
    private dialogService: DialogService,
    private translationService: TranslateService,
  ) { }

  handleError = async (error: any): Promise<void> => {
    if (error instanceof GamePopupHandlerError) {
      const result = await this.dialogService.showDialog(
        error.message,
        error.dialogType
      );
      if (result && error.dialogType == DialogType.endGame) {
        this.gameEngineServices.reset();
      } else if(result && error.dialogType == DialogType.endGame) {
        this.gameEngineServices.isGameOver = true;
      }
    } else {
      this.dialogService.showDialog(
        this.translationService.instant('popup-content.unknown'),
        DialogType.unknown
      );
    }
  }
}
