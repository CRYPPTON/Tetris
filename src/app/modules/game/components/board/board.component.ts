import { AfterViewInit, Component, Input } from '@angular/core';
import { GameEngineService } from 'src/app/core/services';
import { GameColor } from 'src/app/shared/enums';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements AfterViewInit {

  //#region Angular stuff

  @Input() borderSize: number;
  @Input() isGameBoard: boolean;

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

  //#endregion

  constructor(private gameEngineService: GameEngineService) { }

//#region Life Cycle hooks

  ngAfterViewInit(): void {
    this.setGrid();
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
