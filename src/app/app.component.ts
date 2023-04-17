import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from './services/authentication/auth.service';
import { HttpService } from './services/http/http.service';
import { REGISTRATION_USER_ID } from './shared/constants/user-login';
import { IUser } from './shared/models/user.interface';
import { MatSidenav } from '@angular/material/sidenav';
import { ToggleState } from './shared/models/toggle.enum';
import { BehaviorSubject, Subject } from 'rxjs';
import { ToggleService } from './services/toggle/toggle.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('leftMenu') menu?: MatSidenav;
  public title: string = 'bookshelf';
  public isLogined?: boolean = false;
  public isPanelActive$?: Subject<boolean>;
  public isProfileActive$?: Subject<boolean>;
  public userProfile?: IUser;

  constructor(
    public authService: AuthService,
    private http: HttpService,
    private toggleService: ToggleService
  ) {}

  public ngOnInit(): void {
    this.getUser();
    this.isPanelActive$ = this.toggleService.isPanelActive$;
    this.isProfileActive$ = this.toggleService.isProfileActive$;
  }

  public get checkAuth(): boolean {
    return this.authService.isLogined();
  }

  public getUser(): void {
    this.http
      .getUser(REGISTRATION_USER_ID)
      .subscribe((user) => (this.userProfile = user));
  }

  public toggle(state: string): void {
    this.menu?.toggle();
    this.toggleService.onToggle(state);
  }
}
