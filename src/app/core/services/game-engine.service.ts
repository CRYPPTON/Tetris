import { Injectable } from '@angular/core';
import { DialogType, GameColor } from '@app-enums';
import { TranslateService } from '@ngx-translate/core';
import { GamePopupHandlerError } from '../popups-handlers';

@Injectable({
  providedIn: 'root'
})
export class GameEngineService {

  //#region Class properties

  gameBoardSize: number;
  smallBoardSize: number;

  tetrisMatrix: Array<GameColor[]>;

  playMatrix: Array<GameColor[]>;
  currentShapePiecesNumber: number;

  currentColor: GameColor;
  score: number;
  isGameOver: boolean;

  //#endregion

  constructor(private translationService: TranslateService) {
    this.initGame();
  }

  //#region Game functionality

  public play(row: number, column: number): void {

    //  this.isGameOver = this.checkEndGame();

    // if(this.isGameOver) {
    //   throw new GamePopupHandlerError(
    //     this.translationService.instant('popup-content.end-game'),
    //     DialogType.endGame
    //   )
    // }

    let isCollision = this.checkCollision(row, column);

    if (isCollision) {
      throw new GamePopupHandlerError(
        this.translationService.instant('popup-content.collision-error'),
        DialogType.collisionError
      )
    }

    this.setTetrisMatrix(row, column);

    this.playMatrix = this.createBoard(this.smallBoardSize);
    this.score += this.currentShapePiecesNumber;

    this.generateRandomShape();
  }

  public reset(): void {
    this.initGame();
  }

  //#endregion

  //#region Init methods

  private initGame(): void {
    this.gameBoardSize = 10;
    this.smallBoardSize = 4;
    this.currentColor = GameColor.red;
    this.score = 0;
    this.isGameOver = false;

    this.tetrisMatrix = this.createBoard(this.gameBoardSize);
    this.playMatrix = this.createBoard(this.smallBoardSize);
    this.generateRandomShape();
  }

  //#endregion

  //#region Game utility

  public setColor(color: GameColor): void {
    this.currentColor = color;

    for (let i = 0; i < this.smallBoardSize; i++) {
      for (let j = 0; j < this.smallBoardSize; j++) {
        if (this.playMatrix[i][j]) {
          this.playMatrix[i][j] = color;
        }
      }
    }
  }

  /**
   *
   * @param size size of border.
   * @returns an empty array of GameColors array.
   */
  private createBoard(size: number): Array<GameColor[]> {
    let board: Array<GameColor[]> = [];
    for (let i = 0; i < size; i++) {
      board.push(Array(size));
    }
    return board;
  }

  /**
   * Generate random shape.
   */
  private generateRandomShape(): void {
    let maxNumberOfPieces = this.smallBoardSize * this.smallBoardSize;
    this.currentShapePiecesNumber = this.randomNumber(maxNumberOfPieces);
    let numberOfPieces = this.currentShapePiecesNumber;

    if (numberOfPieces == 0) {
      numberOfPieces = 1;
    }
    while (numberOfPieces > 0) {
      let row = this.randomNumber(this.smallBoardSize);
      let column = this.randomNumber(this.smallBoardSize);

      if (this.playMatrix[row][column]) {
        numberOfPieces++;
      } else {
        this.playMatrix[row][column] = this.currentColor;
      }
      numberOfPieces--;
    }
  }

  /**
   *
   * @param end an integer;
   * @returns a random integer from 1 to @param end:
   */
  private randomNumber(end: number): number {
    return Math.floor(Math.random() * end);
  }

  private checkCollision(row: number, column: number): boolean {
    for (let i = 0; i < this.smallBoardSize; i++) {
      for (let j = 0; j < this.smallBoardSize; j++) {
        if ((i + row >= this.gameBoardSize || j + column >= this.gameBoardSize) && this.playMatrix[i][j]) {
          throw new GamePopupHandlerError(
            this.translationService.instant('popup-content.board-error'),
            DialogType.boardError
          )
        }
        if (this.playMatrix[i][j] && this.tetrisMatrix[i + row][j + column]) {
          return true;
        }
      }
    }
    return false;
  }

  private checkEndGame(): boolean {
  //   let isCollision: boolean = true;

  //   for (let i = 0; i < this.gameBoardSize; i++) {
  //     for (let j = 0; j < this.gameBoardSize; j++) {
  //       console.log(i,j)
  //       if(this.playMatrix[i][j]) {
  //        isCollision = this.checkCollision(i, j);
  //       }
  //     }
  //     if(!isCollision) {
  //       return false;
  //     }
  //   }

    return true;
  }

  private setTetrisMatrix(row: number, column: number): void {
    for (let i = 0; i < this.smallBoardSize; i++) {
      for (let j = 0; j < this.smallBoardSize; j++) {
        if (this.playMatrix[i][j]) {
          this.tetrisMatrix[i + row][j + column] = this.playMatrix[i][j];
        }
      }
    }
  }

  //#endregion

}
