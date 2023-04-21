import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { IUser, IUserEndponit } from 'src/app/shared/models/user.interface';
import { httpError } from '../httpError/http-error.service';
import { IBook } from 'src/app/shared/models/books.interface';
import { API_URL_1, API_URL_2 } from 'src/app/shared/constants/inject-tokens';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(
    private http: HttpClient,
    @Inject(API_URL_1) private apiUrl1: string,
    @Inject(API_URL_2) private apiUrl2: string
  ) {}

  public getUser(id: number): Observable<IUser> {
    return this.http.get<IUserEndponit>(`${this.apiUrl1}${id}`).pipe(
      map((resp: IUserEndponit) => {
        return resp.data;
      }),
      catchError(httpError)
    );
  }

  public getAllBooks(): Observable<IBook[]> {
    return this.http.get<IBook[]>(this.apiUrl2).pipe(catchError(httpError));
  }

  public getOneBook(bookId: number): Observable<IBook> {
    return this.http
      .get<IBook>(`${this.apiUrl2}/${bookId}`)
      .pipe(catchError(httpError));
  }

  public createBook(book: IBook): Observable<IBook> {
    return this.http
      .post<IBook>(this.apiUrl2, book)
      .pipe(catchError(httpError));
  }

  public updateBook(book: IBook): Observable<IBook> {
    return this.http.put<IBook>(this.apiUrl2, book).pipe(catchError(httpError));
  }
}
