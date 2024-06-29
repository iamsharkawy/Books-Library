import { Component, Input, OnInit } from '@angular/core';
import { CardComponent } from './card/card.component';
import { BooksService } from '../services/books.service';
import { NgFor, NgIf } from '@angular/common';
import { Work, BookResponse } from '../models/book.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent, NgFor, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  bookList: Work[] = [];
  isLoading = false;
  error: any;
  @Input() filteredBooks: any[] = [];

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.getBooks();
  }

  getBooks() {
    this.booksService.getFinanceBooks().subscribe(
      (result: BookResponse) => {
        this.bookList = result.works;
        this.isLoading = false;
      },
      (error: any) => {
        this.error = error;
        this.isLoading = false;
      }
    );
  }
}
