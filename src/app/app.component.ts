import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AuthService } from './services/authentication/auth.service';
import { HttpService } from './services/http/http.service';
import { REGISTRATION_USER_ID } from './shared/constants/user-login';
import { IUser } from './shared/models/user.interface';
import { MatSidenav } from '@angular/material/sidenav';
import { Subject, takeUntil } from 'rxjs';
import { ToggleService } from './services/toggle/toggle.service';
import { NavigationService } from './services/navigation/navigation.service';
import { Unsubscriber } from './shared/classes/destroy.abstract';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends Unsubscriber implements OnInit, OnDestroy {
  @ViewChild('leftMenu') menu?: MatSidenav;
  public title: string = 'bookshelf';
  public isLogined?: boolean = false;
  public isPanelActive$?: Subject<boolean>;
  public isProfileActive$?: Subject<boolean>;
  public userProfile?: IUser;
  public isLoading: boolean = false;

  constructor(
    public authService: AuthService,
    private http: HttpService,
    private toggleService: ToggleService,
    private navigationService: NavigationService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.getUser();
    this.isPanelActive$ = this.toggleService.isPanelActive$;
    this.isProfileActive$ = this.toggleService.isProfileActive$;
    this.subscribeToLoadingState();
  }

  public get checkAuth(): boolean {
    return this.authService.isLogined();
  }

  public subscribeToLoadingState(): void {
    this.navigationService.isLoading$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((loadingState) => {
        this.isLoading = loadingState;
      });
  }

  public getUser(): void {
    this.http
      .getUser(REGISTRATION_USER_ID)
      .subscribe((user) => (this.userProfile = user));
  }

  public onToggle(state: string): void {
    this.menu?.toggle();
    this.toggleService.toggle(state);
  }
}
