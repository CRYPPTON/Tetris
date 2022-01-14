import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';

const ngModules = [
  MatButtonModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...ngModules],
  exports: [...ngModules],
})
export class MaterialModule { }
