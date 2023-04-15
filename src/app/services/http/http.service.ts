import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { IUser, IUserEndponit } from 'src/app/shared/models/user.interface';
import { httpError } from '../httpError/http-error.service';
import { IBook } from 'src/app/shared/models/books.interface';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private apiUrl1 = 'https://reqres.in/api/users/';
  private apiUrl2 = 'https://fakerestapi.azurewebsites.net/api/v1/Books';

  constructor(private http: HttpClient) {}

  public getUser(id: number): Observable<IUser> {
    return this.http.get<IUserEndponit>(`${this.apiUrl1}${id}`).pipe(
      map((resp: IUserEndponit) => {
        return resp.data;
      }),
      catchError(httpError)
    );
  }

  public getAllBooks(): Observable<IBook[]> {
    return this.http.get<IBook[]>(`${this.apiUrl2}`);
  }
}
