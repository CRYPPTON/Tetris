import { Component } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { GameColor } from '@app-enums';

@Component({
  selector: 'app-tetris',
  templateUrl: './tetris.component.html',
  styleUrls: ['./tetris.component.scss']
})
export class TetrisComponent {

  //#region Class properties

  gameColors = ['red', 'blue', 'green'];
  selectedColor: GameColor;

  //#endregion

  constructor() {}

  //#region UI events

  /**
     * Set game difficulty.
     * @param events MatSelectChange object that contain game difficulty value.
     */
  public onSetColor(events: MatSelectChange): void {
    this.selectedColor = events.value;
    // set color ...
  }

  //#endregion

}
