import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  baseUrl = 'https://openlibrary.org/subjects/finance.json?limit=9'; // Limit to 9 books

  constructor(private http: HttpClient) { }

  getFininanceBooks(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
}
