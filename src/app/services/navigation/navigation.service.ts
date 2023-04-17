import { Injectable } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  Event,
} from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  public isLoadingSubject$ = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      this.loader(event);
    });
  }

  public get isLoading$(): Observable<boolean> {
    return this.isLoadingSubject$.asObservable();
  }

  loader(event: Event): void {
    switch (true) {
      case event instanceof NavigationStart: {
        this.isLoadingSubject$.next(true);
        break;
      }
      case event instanceof NavigationEnd:
      case event instanceof NavigationCancel:
      case event instanceof NavigationError: {
        this.isLoadingSubject$.next(false);
        break;
      }
      default: {
        break;
      }
    }
  }
}
