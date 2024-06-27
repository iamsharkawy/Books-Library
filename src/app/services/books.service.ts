// books.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  baseUrl = 'https://openlibrary.org/subjects/finance.json?limit=9'; // Limit to 9 books

  constructor(private http: HttpClient) { }

  getFininanceBooks(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getBookDetails(bookKey: string): Observable<any> {
    return this.http.get(`https://openlibrary.org${bookKey}.json`);
  }

  getBookEditions(bookKey: string): Observable<any> {
    return this.http.get(`https://openlibrary.org${bookKey}/editions.json`);
  }

  getAuthorDetails(authorKey: string): Observable<any> {
    return this.http.get(`https://openlibrary.org${authorKey}.json`);
  }
}
