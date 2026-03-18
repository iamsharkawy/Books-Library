import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BooksService } from '../services/books.service';
import { CardComponent } from '../home/card/card.component';
import { Work, BookResponse } from '../models/book.model';

@Component({
    selector: 'app-search',
    standalone: true,
    templateUrl: './search.component.html',
    styleUrl: './search.component.scss',
    imports: [CommonModule, FormsModule, CardComponent]
})
export class SearchComponent implements OnInit {
    searchQuery: string = '';
    allBooks: Work[] = [];
    filteredBooks: Work[] = [];
    isLoading: boolean = false;
    error: any;

    constructor(private booksService: BooksService) {}

    ngOnInit(): void {
        this.isLoading = true;
        this.booksService.getFinanceBooks().subscribe({
            next: (result: BookResponse) => {
                this.allBooks = result.works;
                // Initially don't show all books, only show when typing
                this.filteredBooks = [];
                this.isLoading = false;
            },
            error: (err: any) => {
                this.error = err;
                this.isLoading = false;
            }
        });
    }

    onSearch(): void {
        const query = this.searchQuery.trim().toLowerCase();

        if (!query) {
            this.filteredBooks = []; // clear if empty
            return;
        }

        if (query.length === 1) {
            // If just one letter, return books that start with this letter
            this.filteredBooks = this.allBooks.filter(book => 
                book.title.toLowerCase().startsWith(query)
            );
        } else {
            // General containing search
            this.filteredBooks = this.allBooks.filter(book => 
                book.title.toLowerCase().includes(query)
            );
        }
    }
}
