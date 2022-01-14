import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

const ngModules = [
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
  MatCardModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...ngModules],
  exports: [...ngModules],
})
export class MaterialModule { }
