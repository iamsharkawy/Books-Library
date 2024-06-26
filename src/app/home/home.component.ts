import { Component, OnInit } from '@angular/core';
import { CardComponent } from './card/card.component';
import { BooksService } from '../services/books.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent, NgFor, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  bookList: any = []
  isLoading = false;
  error: any
  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.getBooks();
  }

  getBooks() {
    this.booksService.getFininanceBooks().subscribe(
      result => {
        this.bookList = result;
        this.isLoading = false;
        console.log(result)
      }, error => {
        this.error = error
        this.isLoading = false;
      }
    )
  }
}
