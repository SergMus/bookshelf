import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksGridComponent } from './books-grid.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TdContentDirective } from 'src/app/directives/td-content.directive';

const routes: Routes = [
  {
    path: '',
    component: BooksGridComponent,
  },
];

@NgModule({
  declarations: [BooksGridComponent, TdContentDirective],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(routes),
  ],
  exports: [BooksGridComponent, RouterModule],
})
export class BooksGridModule {}
