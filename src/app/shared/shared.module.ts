import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [],
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
