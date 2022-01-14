import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GamePopupHandlerError } from './core/popups-handlers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tetris';

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('sr');
  }

  //#region UI events

  public onOpenDialog(): void {
    throw new GamePopupHandlerError(this.translate.instant("popup-content.message"));
  }

  //#endregion
}
