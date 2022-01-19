import { Component } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { GameColor } from '@app-enums';
import { GameEngineService } from '@app-services';

@Component({
  selector: 'app-tetris',
  templateUrl: './tetris.component.html',
  styleUrls: ['./tetris.component.scss']
})
export class TetrisComponent {

  //#region Class properties

  gameColors = ['red', 'blue', 'green'];
  selectedColor: GameColor;

  isHint: boolean;

  get hintNumber(): number {
    return this.gameEngineService.hintNumber;
  }

  get gameBoardSize(): number {
    return this.gameEngineService.gameBoardSize;
  }

  get smallBoardSize(): number {
    return this.gameEngineService.smallBoardSize;
  }

  get score(): number {
    return this.gameEngineService.score;
  }

  get gameOver(): boolean {
    return this.gameEngineService.isGameOver;
  }

  //#endregion

  constructor(private gameEngineService: GameEngineService) { }

  //#region UI events

  /**
     * Set game difficulty.
     * @param events MatSelectChange object that contain game difficulty value.
     */
  public onSetColor(events: MatSelectChange): void {
    this.selectedColor = events.value;
    this.gameEngineService.setColor(this.selectedColor);
  }

  public onReset(): void {
    this.gameEngineService.reset();
  }

  public onHint(): void {
    this.isHint = true;
    this.gameEngineService.decreaseHintNumber();
  }

  //#endregion

  public changeHint(isHint: boolean): void {
    this.isHint = isHint;
  }
}
