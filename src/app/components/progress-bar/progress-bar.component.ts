import { Component, Input, OnDestroy } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { Unsubscriber } from 'src/app/shared/classes/destroy.abstract';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent extends Unsubscriber implements OnDestroy {
  public isProgress: boolean = false;

  constructor(private navigationService: NavigationService) {
    super();
    this.subscribeToLoadingState();
  }

  public subscribeToLoadingState(): void {
    this.navigationService.isLoading$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((loadingState) => {
        this.isProgress = loadingState;
      });
  }
}
