import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
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
