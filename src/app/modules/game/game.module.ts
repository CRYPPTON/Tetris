import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { TetrisComponent } from './components/tetris/tetris.component';
import { BoardComponent } from './components/board/board.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    TetrisComponent,
    BoardComponent
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    SharedModule,
    TranslateModule
  ]
})
export class GameModule { }
