import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BooksService } from '../services/books.service';
import { NgIf, NgFor } from '@angular/common';
import { Author } from '../models/book.model';

@Component({
  selector: 'app-author',
  standalone: true,
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss'],
  imports: [NgIf, NgFor, RouterLink],
})
export class AuthorComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  authorKey!: string;
  authorDetails!: Author;
  isLoading = false;
  error: any;

  constructor(private booksService: BooksService) {
    this.authorKey = this.route.snapshot.params['key'].replace('/authors', '');
  }

  ngOnInit() {
    this.isLoading = true;
    this.getAuthorDetails(this.authorKey);
  }

  getAuthorDetails(authorKey: any) {
    this.booksService.getAuthorDetails(authorKey).subscribe(
      (result) => {
        this.authorDetails = result;
        this.isLoading = false;
      },
      (error) => {
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
