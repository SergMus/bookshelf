import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, takeUntil } from 'rxjs';
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
  public pageTitle?: string;
  public buttonText?: string;
  public bookDate?: Date;
  public form!: FormGroup;
  public matcher: ErrorStateMatcherService = new ErrorStateMatcherService();
  public bookId?: number;
  public bookData$?: Observable<IBook>;
  public bookData?: IBook;

  constructor(
    private httpService: HttpService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    super();
  }

  public ngOnInit(): void {
    this.initializeFormGroup();
    this.checkUrlForId();
  }

  public initializeFormGroup(): void {
    this.form = this.fb.group({
      title: ['', [Validators.minLength(2), Validators.required]],
      description: ['', [Validators.minLength(2), Validators.required]],
      publishDate: ['', [Validators.required]],
      pageCount: [
        '',
        [Validators.required, Validators.pattern(REGEX_ONLY_DIGITS)],
      ],
    });
  }

  public checkUrlForId(): void {
    this.route.paramMap
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((params: ParamMap) => {
        this.bookId = +params.get('id')!;

        if (this.bookId) {
          this.httpService
            .getOneBook(this.bookId)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe({
              next: (book) => {
                this.bookData = book;
              },
            });
        }
        this.pageTitle = this.bookId ? 'edit book' : 'create book';
        this.buttonText = this.bookId ? 'edit book' : 'add book';
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
