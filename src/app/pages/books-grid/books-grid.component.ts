import { Component, OnDestroy, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSelect } from '@angular/material/select';
import { MatPaginator } from '@angular/material/paginator';

import { HttpService } from 'src/app/services/http/http.service';
import { IBook } from 'src/app/shared/models/books.interface';
import { BooksListService } from 'src/app/services/books-list/books-list.service';
import { Unsubscriber } from 'src/app/shared/classes/destroy.abstract';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'books-grid',
  templateUrl: './books-grid.component.html',
  styleUrls: ['./books-grid.component.scss'],
})
export class BooksGridComponent extends Unsubscriber implements OnDestroy {
  public readonly displayedColumns: string[] = [
    'position',
    'title',
    'description',
    'count',
    'date',
  ];
  public booksList: IBook[] = [];
  public pageTitle = 'Books shelf';

  public dataSource?: any = null;
  public dateRange: Date[] = [];

  public selectOptionsSort: string[] = ['title', 'count', 'date'];
  public selectOptionsFilter: string[] = ['current Month', 'current Year'];

  constructor(
    private httpService: HttpService,
    private booksListService: BooksListService
  ) {
    super();
  }

  @ViewChild(MatSort) sort?: MatSort;
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  public ngOnInit(): void {
    this.getBooksList();
  }

  public refreshData(data: any): void {
    this.booksList = data;
    this.dataSource = new MatTableDataSource(this.booksList);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public getBooksList(): void {
    this.httpService
      .getAllBooks()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (resp: IBook[]) => {
          this.refreshData(resp);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  public onSortSelect(option: MatSelect): void {
    let column: string = option.value;

    this.sortData({ active: column, direction: 'asc' });
  }

  public onFilterSelect(option: MatSelect): void {
    let column: string = option.value;

    const now = new Date();

    if (column === undefined) {
      const defaultStartDate = new Date(0, 0, 0);

      this.dateRange = [defaultStartDate, now];
      this.filterByDateRange();
    }

    if (column === 'current Month') {
      const firstDateOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

      this.dateRange = [firstDateOfMonth, now];
      this.filterByDateRange();
    }

    if (column === 'current Year') {
      const firstDayOfYear = new Date(now.getFullYear(), 0, 1);

      this.dateRange = [firstDayOfYear, now];
      this.filterByDateRange();
    }
  }

  public sortData(sort: Sort): void {
    this.dataSource = this.booksListService.sortBooks(
      sort,
      this.booksList,
      this.dataSource
    );

    this.refreshData(this.dataSource);
  }

  public filterByDateRange(): void {
    const fromDate = this.dateRange[0];
    const toDate = this.dateRange[1];

    if (!fromDate || !toDate) {
      return;
    }

    if (this.dataSource && this.dataSource.data.length) {
      this.dataSource.filterPredicate = (book: IBook) => {
        const publicationDate = new Date(book.publishDate);
        return publicationDate >= fromDate && toDate >= publicationDate;
      };

      this.dataSource.filter = JSON.stringify(true);
    }
  }

  public onInput(text: HTMLInputElement): void {
    if (this.dataSource) {
      this.dataSource.filter = text.value.trim().toLowerCase();
      this.dataSource.filterPredicate = (book: IBook, filter: string) => {
        return book.title.toLowerCase().includes(filter);
      };
    }
  }
}
