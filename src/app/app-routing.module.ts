import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'books',
    pathMatch: 'full',
  },
  {
    path: 'books',
    loadChildren: () =>
      import('./pages/books-grid/books-grid.module').then(
        (m) => m.BooksGridModule
      ),
  },
  {
    path: 'books/create',
    loadChildren: () =>
      import('./pages/book-form/book-form.module').then(
        (m) => m.BookFormModule
      ),
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '**',
    loadChildren: () =>
      import('./pages/not-found/not-found.module').then(
        (m) => m.NotFoundModule
      ),
    data: { btnText: 'books page', link: 'books' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
