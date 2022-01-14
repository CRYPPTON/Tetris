import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GameDialogComponent } from 'src/app/shared/components/game-dialog/game-dialog.component';
import { DialogType } from '@app-enums';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog) { }

  public showDialog(message: string, dialogType: DialogType): Promise<boolean> {
    const dialogPromise = this.dialog.open(GameDialogComponent, {
      data: {
        message: message,
        dialogType: dialogType
      }
    }).afterClosed().toPromise();
    return dialogPromise;
  }
}
