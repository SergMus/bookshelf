import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { ToggleState } from 'src/app/shared/models/toggle.enum';
import { IUser } from 'src/app/shared/models/user.interface';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  @Input() leftMenu?: MatSidenav;
  @Input() user?: IUser;
  @Output() profileBtnClick = new EventEmitter<string>();

  constructor(public authService: AuthService) {}

  public toggle(): void {
    this.profileBtnClick.emit('profile');
  }

  public logout(): void {
    this.authService.logout();
  }
}
