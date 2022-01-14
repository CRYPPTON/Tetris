import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogType } from '@app-enums';
import { PopupDataType } from '@app-models';

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

  //#endregion

  constructor(@Inject(MAT_DIALOG_DATA) public data: PopupDataType) {
    this.icon = "question_answer";
    if(data.dialogType === this.dialogType.game) {
      this.color = "green";
    } else {
      this.color = "red";
    }
  }

}
