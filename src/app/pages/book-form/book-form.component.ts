import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { SnackBarComponent } from 'src/app/components/snack-bar/snack-bar.component';
import { ErrorStateMatcherService } from 'src/app/services/errorStateMatcher/error-state-matcher.service';
import { HttpService } from 'src/app/services/http/http.service';
import { Unsubscriber } from 'src/app/shared/classes/destroy.abstract';
import { REGEX_ONLY_DIGITS } from 'src/app/shared/constants/regex';
import { IBook } from 'src/app/shared/models/books.interface';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss'],
})
export class BookFormComponent
  extends Unsubscriber
  implements OnInit, OnDestroy
{
  public pageTitle: string = 'create book';
  public buttonText: string = 'add book';
  public bookDate?: Date;
  public form!: FormGroup;
  public matcher: ErrorStateMatcherService = new ErrorStateMatcherService();

  constructor(
    private httpService: HttpService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    super();
  }

  public ngOnInit(): void {
    this.initializeFormGroup();
  }

  public initializeFormGroup(): void {
    this.form = new FormGroup({
      title: new FormControl('', [
        Validators.minLength(2),
        Validators.required,
      ]),
      description: new FormControl('', [
        Validators.minLength(2),
        Validators.required,
      ]),
      publishDate: new FormControl('', [Validators.required]),
      pageCount: new FormControl('', [
        Validators.required,
        Validators.pattern(REGEX_ONLY_DIGITS),
      ]),
    });
  }

  public addDate(event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      this.bookDate = event.value;
    }
  }

  public submit(): void {
    if (this.form?.valid) {
      const formData: IBook = {
        title: this.form?.get('title')?.value,
        description: this.form?.get('description')?.value,
        pageCount: +this.form?.get('pageCount')?.value,
        publishDate: this.form?.get('publishDate')?.value,
        excerpt: '',
        id: 1,
      };

      this.httpService
        .createBook(formData)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe();

      this.openSnackBar();
      this.router.navigate(['books']);
    }
  }

  public openSnackBar(): void {
    if (this.form?.valid) {
      this._snackBar.openFromComponent(SnackBarComponent, {
        duration: 3000,
      });
    }
  }
}
