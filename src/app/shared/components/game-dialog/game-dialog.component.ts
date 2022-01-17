import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogType } from '@app-enums';
import { PopupDataType } from '@app-models';
import { GameEngineService } from 'src/app/core/services';

@Component({
  selector: 'app-game-dialog',
  templateUrl: './game-dialog.component.html',
  styleUrls: ['./game-dialog.component.scss']
})
export class GameDialogComponent {

  //#region Class properties

  public icon: string;
  public color: string;

  get dialogType(): typeof DialogType {
    return DialogType;
  }

  get score(): number {
    return this.gameEngineService.score;
  }

  //#endregion

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PopupDataType,
    private gameEngineService: GameEngineService
  ) {
    this.icon = "question_answer";
    if (data.dialogType === this.dialogType.endGame) {
      this.color = "green";
    } else {
      this.color = "red";
    }
  }

}
