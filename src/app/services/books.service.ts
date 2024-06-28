// books.service.ts
import { HttpClient } from '@angular/common/http';
import { TmplAstDeferredBlockLoading } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  baseUrl = 'https://openlibrary.org/subjects/finance.json?limit=9'; // Limit to 9 books

  constructor(private http: HttpClient) { }

  getFinanceBooks(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getBookDetails(bookKey: string): Observable<any> {
    return this.http.get(`https://openlibrary.org${bookKey}.json`);
  }

  getBookEditions(bookKey: string): Observable<any> {
    return this.http.get(`https://openlibrary.org${bookKey}/editions.json`);
  }

  getAuthorDetails(authorKey: string): Observable<any> {
    const authorUrl = `https://openlibrary.org/authors/${authorKey}.json`;
    const worksUrl = `https://openlibrary.org/authors/${authorKey}/works.json`; // Fetch all works

    return forkJoin({
      author: this.http.get(authorUrl),
      works: this.http.get(worksUrl).pipe(
        map((worksData: any) => worksData.entries)
      )
    }).pipe(
      map((results: any) => {
        const authorDetails = results.author;
        const works = results.works;
        const subjects = works
          .map((work: any) => work.subjects)
          .flat()
          .filter((subject: any) => subject !== undefined)
          .slice(0, 5); 
        return {
          ...authorDetails,
          worksCount: works.length,
          topSubjects: subjects
        };
      })
    );
  }
}
