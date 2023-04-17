import { Injectable } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IBook } from 'src/app/shared/models/books.interface';

@Injectable({
  providedIn: 'root',
})
export class BooksListService {
  public sortBooks<T extends IBook>(
    sort: Sort,
    inputData: T[],
    source: T[]
  ): T[] {
    const data = inputData.slice();
    if (sort.active === null || sort.direction === '') {
      source = data;
      return source;
    }

    source = data.sort((a: T, b: T): number => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case undefined:
          return this.compare(a.id, b.id, isAsc);
        case 'title':
          return this.compare(a.title, b.title, isAsc);
        case 'count':
          return this.compare(a.pageCount, b.pageCount, isAsc);
        case 'date':
          return this.compare(a.publishDate, b.publishDate, isAsc);
        default:
          return 0;
      }
    });

    return source;
  }

  public filterByDateRange(
    dataSource: MatTableDataSource<IBook>,
    dateRange: Date[]
  ) {
    const fromDate = dateRange[0];
    const toDate = dateRange[1];

    if (!fromDate || !toDate) {
      return;
    }

    if (dataSource && dataSource.data.length) {
      dataSource.filterPredicate = (book: IBook) => {
        const publicationDate = new Date(book.publishDate);
        return publicationDate >= fromDate && toDate >= publicationDate;
      };

      dataSource.filter = JSON.stringify(true);
    }
  }

  public filterData(
    option: MatSelect | string,
    dataSource: MatTableDataSource<IBook>,
    dateRange: Date[]
  ): void {
    let column: string = '';

    if (option instanceof MatSelect) {
      column = option.value;
    }

    const now = new Date();

    if (column === undefined) {
      const defaultStartDate = new Date(0, 0, 0);

      dateRange = [defaultStartDate, now];
      this.filterByDateRange(dataSource, dateRange);
    }

    if (column === 'current Month') {
      const firstDateOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

      dateRange = [firstDateOfMonth, now];
      this.filterByDateRange(dataSource, dateRange);
    }

    if (column === 'current Year') {
      const firstDayOfYear = new Date(now.getFullYear(), 0, 1);

      dateRange = [firstDayOfYear, now];
      this.filterByDateRange(dataSource, dateRange);
    }

    if ('datePicker') {
      this.filterByDateRange(dataSource, dateRange);
    }
  }

  public compare(
    a: number | string,
    b: number | string,
    isAsc: boolean
  ): number {
    if (typeof a === 'string' && typeof b === 'string') {
      return isAsc ? a.localeCompare(b) : b.localeCompare(a);
    }
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
