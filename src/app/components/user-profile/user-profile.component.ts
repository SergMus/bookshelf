import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';
import { ToggleState } from 'src/app/shared/models/toggle.enum';
import { IUser } from 'src/app/shared/models/user.interface';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  @HostListener('click', ['$event.target']) onButtonClose(target: HTMLElement) {
    if (target.classList.contains('profile-body')) {
      this.showProfile();
    }
  }
  @Input() userProfile?: IUser;
  @Input() isActive: boolean | null = false;
  @Output() closeBtnClick = new EventEmitter<string>();

  public showProfile() {
    this.closeBtnClick.emit(ToggleState.Profile);
  }
}
