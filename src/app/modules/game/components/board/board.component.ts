import { AfterViewInit, Component, Input } from '@angular/core';

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

  constructor() { }

  ngAfterViewInit(): void {
    this.setGrid();
  }

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
}
