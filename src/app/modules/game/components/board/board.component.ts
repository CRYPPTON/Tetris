import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { GameEngineService } from '@app-services';
import { GameColor } from '@app-enums';
import { Hint } from 'src/app/shared/models';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements AfterViewInit, OnChanges {

  //#region Angular stuff

  @Input() borderSize: number;
  @Input() isGameBoard: boolean;
  @Input() isHint: boolean;
  @Output() hintEvent = new EventEmitter<boolean>();

  //#endregion

  //#region Game properties

  get playerBoard(): Array<GameColor[]> {
    return this.gameEngineService.playMatrix;
  }

  get tetrisMatrix(): Array<GameColor[]> {
    return this.gameEngineService.tetrisMatrix;
  }

  get currentColor(): GameColor {
    return this.gameEngineService.currentColor;
  }

  get isGameOver(): boolean {
    return this.gameEngineService.isGameOver;
  }

  get hint(): Hint {
    return this.gameEngineService.hint;
  }

  //#endregion

  constructor(private gameEngineService: GameEngineService) { }

  //#region Life Cycle hooks

  ngAfterViewInit(): void {
    this.setGrid();
  }

  ngOnChanges(): void {

    if (this.isHint) {

      let row = this.hint.row;
      let column = this.hint.column;
      let colorBeforeHint = this.tetrisMatrix[row][column];

      this.tetrisMatrix[row][column] = GameColor.black;
      setTimeout(() => {
        this.tetrisMatrix[row][column] = colorBeforeHint!;
        this.hintEvent.emit(false);
      }, 1000);
    }

  }

  //#endregion

  /**
  * Set grid for selected board.
  */
  private setGrid(): void {
    if (this.isGameBoard) {
      const element = (document.querySelector('.big-board') as HTMLElement);
      element.style.gridTemplateColumns = `repeat(${this.borderSize}, 1fr)`;
      element.style.gridTemplateRows = `repeat(${this.borderSize}, 1fr)`
    } else {
      const element = (document.querySelector('.small-board') as HTMLElement);
      element.style.gridTemplateColumns = `repeat(${this.borderSize}, 1fr)`;
      element.style.gridTemplateRows = `repeat(${this.borderSize}, 1fr)`
    }
  }

  //#region UI events

  public onPlay(row: number, column: number): void {
    this.gameEngineService.play(row, column);
  }

  //#endregion
}
