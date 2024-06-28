// details.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BooksService } from '../services/books.service';
import { NgIf , NgFor } from '@angular/common';
import { forkJoin } from 'rxjs';
import { AuthorBookDetails , Author , BookDetails, EditionResponse , EditionEntrie } from '../models/book.model';

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
  bookDetails: BookDetails = {
    title: '',
    first_publish_date: '',
    number_of_pages: 0,
    covers: undefined,
    authors: []
  };
  editionDetails: EditionEntrie[] = [];
  authors: Author[] = [];
  isLoading = false;
  error: any;

  constructor(private booksService: BooksService) {
    this.bookKey = this.route.snapshot.params['key'];
  }

  ngOnInit() {
    this.isLoading = true;
    this.getBookDetails();
  }

  getBookDetails() {
    this.booksService.getBookDetails(this.bookKey).subscribe(
      (data: BookDetails) => {
        this.bookDetails = data;
        this.getBookEditions();
        this.getAuthorsNames(data.authors);
        this.isLoading = false;
      },
      (error) => {
        this.error = error;
        this.isLoading = false;
      }
    );
  }

  getBookEditions() {
    this.booksService.getBookEditions(this.bookKey).subscribe(
      (data: EditionResponse) => {
        this.editionDetails = data.entries;
        this.isLoading = false;
      },
      (error) => {
        this.error = error;
        this.isLoading = false;
      }
    );
  }

  getAuthorsNames(authors: AuthorBookDetails[]) {
    const authorObservables = authors.map(author =>
      this.booksService.getAuthorDetails(author.author.key.replace('/authors/', ''))
    );

    forkJoin(authorObservables).subscribe(
      authorDetailsArray => {
        this.authors = authorDetailsArray
      },
      error => {
        this.error = error;
        this.isLoading = false;
      }
    );
  }

  getCoverImageUrl(cover_id: number | null): string {
    if (!cover_id) {
      return '';
    }
    return `https://covers.openlibrary.org/b/id/${cover_id}.jpg`;
  }
}
