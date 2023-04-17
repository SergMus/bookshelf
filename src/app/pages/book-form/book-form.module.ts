import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackBarComponent } from 'src/app/components/snack-bar/snack-bar.component';
import { BookFormComponent } from './book-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: BookFormComponent,
  },
];

@NgModule({
  declarations: [SnackBarComponent, BookFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    RouterModule.forChild(routes),
  ],
  exports: [SnackBarComponent, BookFormComponent, RouterModule],
})
export class BookFormModule {}
