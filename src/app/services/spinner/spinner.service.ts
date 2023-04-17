import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  public _spinnerVisible$ = new BehaviorSubject<boolean>(false);

  constructor() {}

  public get spinnerVisible$(): Observable<boolean> {
    return this._spinnerVisible$.asObservable();
  }

  public show(): void {
    this._spinnerVisible$.next(true);
  }

  public hide(): void {
    this._spinnerVisible$.next(false);
  }
}
