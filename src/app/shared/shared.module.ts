import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { GameDialogComponent } from './components/game-dialog/game-dialog.component';

@NgModule({
  declarations: [
    GameDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule
  ],
  exports: [
    MaterialModule,
  ]
})
export class SharedModule { }
