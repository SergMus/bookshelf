import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToggleState } from 'src/app/shared/models/toggle.enum';

@Injectable({
  providedIn: 'root',
})
export class ToggleService {
  public isPanelActive$ = new BehaviorSubject<boolean>(false);
  public isProfileActive$ = new BehaviorSubject<boolean>(false);

  public toggle(state: string): void {
    switch (state) {
      case ToggleState.Panel:
        this.isPanelActive$.next(!this.isPanelActive$.value);
        break;
      case ToggleState.Profile:
        this.isProfileActive$.next(!this.isProfileActive$.value);
        break;
      default:
        throw new Error(`Invalid toggle state: ${state}`);
    }
  }
}
