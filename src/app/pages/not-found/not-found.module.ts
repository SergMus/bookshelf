import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found.component';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';

const routes: Routes = [
  {
    path: '',
    component: NotFoundComponent,
  },
];

@NgModule({
  declarations: [NotFoundComponent],
  imports: [CommonModule, MaterialModule, RouterModule.forChild(routes)],
  exports: [NotFoundComponent, RouterModule],
})
export class NotFoundModule {}
