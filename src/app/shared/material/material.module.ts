import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const ngModules = [
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
  MatCardModule,
  MatSelectModule,
  MatFormFieldModule,
  MatInputModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...ngModules],
  exports: [...ngModules],
})
export class MaterialModule { }
