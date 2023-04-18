import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSelect } from '@angular/material/select';
import { MatPaginator } from '@angular/material/paginator';

import { HttpService } from 'src/app/services/http/http.service';
import { IBook } from 'src/app/shared/models/books.interface';
import { BooksListService } from 'src/app/services/books-list/books-list.service';
import { Unsubscriber } from 'src/app/shared/classes/destroy.abstract';
import { takeUntil } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'books-grid',
  templateUrl: './books-grid.component.html',
  styleUrls: ['./books-grid.component.scss'],
})
export class BooksGridComponent extends Unsubscriber implements OnDestroy {
  @ViewChild('search') searchInput!: ElementRef<HTMLInputElement>;
  @ViewChild('filterSelect') filterInput!: MatSelect;
  @ViewChild('sortSelect') sortInput!: MatSelect;

  public displayedColumns: string[] = [
    'position',
    'title',
    'description',
    'count',
    'date',
  ];
  public booksList: IBook[] = [];
  public pageTitle = 'Bookshelf';
  public selectedIndex: number = -1;
  public isManageActive: boolean = false;
  public dataSource?: any = null;
  public dateRange: Date[] = [];
  public rangeDatePicker = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

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

  public resetPage(): void {
    this.dataSource.filter = '';
    this.dateRange = [];
    this.rangeDatePicker.reset();
    this.searchInput.nativeElement.value = '';
    this.filterInput.value = null;
    this.sortInput.value = null;
    this.selectedIndex = -1;
    this.getBooksList();
  }

  public onRowClick(row: HTMLTableElement): void {
    this.selectedIndex = +row.id;
    this.onManageClick();
  }

  public setDateRange(): void {
    const start = this.rangeDatePicker.get('start')?.value;
    const end = this.rangeDatePicker.get('end')?.value;

    if (start && end) {
      this.dateRange = [start, end];
    }

    this.booksListService.filterData(
      'datePicker',
      this.dataSource,
      this.dateRange
    );
  }

  public onSortSelect(option: MatSelect): void {
    let column: string = option.value;

    this.sortData({ active: column, direction: 'asc' });
  }

  public onFilterSelect(option: MatSelect): void {
    this.booksListService.filterData(option, this.dataSource, this.dateRange);
  }

  public sortData(sort: Sort): void {
    this.dataSource = this.booksListService.sortBooks(
      sort,
      this.booksList,
      this.dataSource
    );

    this.refreshData(this.dataSource);
  }

  public onInput(text: HTMLInputElement): void {
    if (this.dataSource) {
      this.dataSource.filter = text.value.trim().toLowerCase();
      this.dataSource.filterPredicate = (book: IBook, filter: string) => {
        return book.title.toLowerCase().includes(filter);
      };
    }
  }

  public onManageClick(): void {
    this.isManageActive = !this.isManageActive;
    console.log(this.isManageActive);

    if (this.isManageActive) {
      this.displayedColumns.push('manage');
    } else {
      const index = this.displayedColumns.indexOf('manage');
      if (index !== -1) {
        this.displayedColumns.splice(index, 1);
      }
    }
  }

  public onEdit(item: any): void {}

  public onDelete(item: any): void {}
}
