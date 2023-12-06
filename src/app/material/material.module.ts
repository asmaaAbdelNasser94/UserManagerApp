import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

const material = [
  // Angular Material Components
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule ,
  MatIconModule ,
  MatTableModule ,
  MatSortModule
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ] ,
  exports:[material],
})
export class MaterialModule { }
