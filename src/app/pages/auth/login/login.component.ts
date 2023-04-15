import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { takeUntil, catchError } from 'rxjs/operators';

import { AuthService } from 'src/app/services/authentication/auth.service';
import { Unsubscriber } from 'src/app/shared/classes/destroy.abstract';
import { USER_EMAIL, USER_PASSWORD } from 'src/app/shared/constants/user-login';
import { IFormData } from 'src/app/shared/models/auth.interface';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends Unsubscriber implements OnInit, OnDestroy {
  public hide = true;
  public form!: FormGroup;
  public errorMessage: string = '';

  constructor(private authService: AuthService) {
    super();
  }

  public ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(USER_EMAIL, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl(USER_PASSWORD, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  public onSubmit(): void {
    if (this.form?.valid) {
      const formData: IFormData = { ...this.form.value };
      this.authService
        .login(formData)
        .pipe(
          catchError((error) => {
            this.errorMessage = error.message;
            return of(null);
          }),
          takeUntil(this.unsubscribe$)
        )
        .subscribe();
    }
  }
}
