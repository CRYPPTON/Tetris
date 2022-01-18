import { Injectable } from '@angular/core';
import { DialogType, GameColor } from '@app-enums';
import { TranslateService } from '@ngx-translate/core';
import { GamePopupHandlerError } from '@app-popup-handlers';
import { Hint } from '@app-models';

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

  hint: Hint;
  hintNumber: number;
  hintList: Hint[];

  //#endregion

  constructor(private translationService: TranslateService) {
    this.initGame();
  }

  //#region Game functionality

  public play(row: number, column: number): void {

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

    this.isGameOver = this.checkEndGame();

    if (this.isGameOver) {
      throw new GamePopupHandlerError(
        this.translationService.instant('popup-content.end-game'),
        DialogType.endGame);
    }

    this.calculateBestHint();

    this.hintList = [];

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
    this.hint = { row: 0, column: 0 };
    this.hintNumber = 20;
    this.hintList = [];

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

  public decreaseHintNumber(): void {
    this.hintNumber--;
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
      this.currentShapePiecesNumber = numberOfPieces;
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

  /**
   * Return true if some pieces in matrix is overlap or fit outside game matrix.
   * @param row a number that represent selected row.
   * @param column a number that represent selected column.
   * @returns a logical data type - boolean.
   */
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

  /**
   * Returns true if there is no more space to set the shape.
   * @returns a logical data type - true/false;
   */
  private checkEndGame(): boolean {
    for (let i = 0; i < this.gameBoardSize; i++) {
      for (let j = 0; j < this.gameBoardSize; j++) {
        try {
          if (!this.checkCollision(i, j)) {
            this.pushHint(this.hint = { row: i, column: j });
            //this.hint = { row: i, column: j };

          }
        } catch (error) {
          continue;
        }
      }
    }
    if (this.hintList.length != 0) {
      return false;
    }

    return true;
  }

  private pushHint(hint: Hint): void {
    this.hintList.push(hint)
  }

  private calculateBestHint(): void {
    let bestHintList = [];

    let count;
    for (let i = 0; i < this.hintList.length; i++) {
      count = 0;
      for (let j = 0; j < this.smallBoardSize; j++) {
        for (let k = 0; k < this.smallBoardSize; k++) {
          try {
            if (this.tetrisMatrix[this.hintList[i].row + j][this.hintList[i].column + k]) {
              count++;
            }
          } catch (error) {
            continue;
          }
        }
      }
      bestHintList.push(count);
    }

    let indexOfMax = bestHintList.indexOf(Math.max.apply(null, bestHintList));
    this.hint = this.hintList[indexOfMax];
  }

  /**
   * Set game shape in tetris matrix.
   * @param row a number that represent row for set.
   * @param column a number that represent column for set.
   */
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
