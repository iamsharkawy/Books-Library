// details.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BooksService } from '../services/books.service';
import { NgIf , NgFor } from '@angular/common';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-details',
  standalone: true,
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
  imports: [NgIf , NgFor , RouterLink]
})
export class DetailsComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  bookKey!: string;
  bookDetails: any;
  editionDetails: any[] = [];
  authors: any[] = [];
  isLoading = true;
  error: any;

  constructor(private booksService: BooksService) {
    this.bookKey = this.route.snapshot.params['key'];
  }

  ngOnInit() {
    this.getBookDetails();
  }

  getBookDetails() {
    this.booksService.getBookDetails(this.bookKey).subscribe(
      (data) => {
        this.bookDetails = data;
        this.getBookEditions();
        this.getAuthorsNames(data.authors);
        console.log("bookdetaisl" , data);
      },
      (error) => {
        this.error = error;
        this.isLoading = false;
      }
    );
  }

  getBookEditions() {
    this.booksService.getBookEditions(this.bookKey).subscribe(
      (data) => {
        this.editionDetails = data.entries;
        this.isLoading = false;
        console.log("bookediton" , data);
      },
      (error) => {
        this.error = error;
        this.isLoading = false;
      }
    );
  }

  getAuthorsNames(authors: any[]) {
    const authorObservables = authors.map(author => 
      this.booksService.getAuthorDetails(author.author.key)
    );

    forkJoin(authorObservables).subscribe(
      authorDetailsArray => {
        this.authors = authorDetailsArray
        console.log(this.authors);
        
      },
      error => {
        this.error = error;
        this.isLoading = false;
      }
    );
  }

  getCoverImageUrl(cover_id: string): string {
    if (!cover_id) {
      return ''; // Return an empty string if no cover ID
    }

    return `https://covers.openlibrary.org/b/id/${cover_id}.jpg`;
  }
}
