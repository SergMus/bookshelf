import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';

import { IFormData } from 'src/app/shared/models/auth.interface';
import { LocalStorageService } from '../localStorage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  public login(data: IFormData): Observable<any> {
    return this.http.post<any>('https://reqres.in/api/login', data).pipe(
      tap((resp) => {
        this.setToken(resp.token);
      }),
      map(() => this.router.navigate(['/books']))
    );
  }

  public logout(): void {
    this.localStorageService.removeData('TOKEN');
    this.router.navigate(['/login']);
  }

  public setToken(token: string): void {
    this.localStorageService.saveData('TOKEN', token);
  }

  public get token(): string {
    return this.localStorageService.getData('TOKEN');
  }

  public isLogined(): boolean {
    return this.token ? true : false;
  }
}
