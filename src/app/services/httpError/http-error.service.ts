export class HttpErrorService {
  constructor() {}
}
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export const httpError = (error: HttpErrorResponse) => {
  if (error.status === 0) {
    console.error('An error occurred:', error.error);
  } else {
    `Backend returned error status: ${error.status}, body was: ${error.error}`;
  }
  return throwError(
    () => new Error('Something bad happened; please try again later.')
  );
};
