import { Component, Input, } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Author } from '../../models/book.model';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgIf, RouterLink ,NgFor],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent{
  @Input() authors: Author[] = []
  @Input() cover_id?: number | null;
  @Input() publicationYear!: Number
  @Input() title!: string
  @Input() key!: string


  getCoverImageUrl(cover_id?: number | null): string {
    if (!cover_id) {
      return '';
    }

    return `https://covers.openlibrary.org/b/id/${cover_id}.jpg`;
  }

  getAuthorsNames(authors: Author[]): string {
    return authors.map(author => author.name).join(', ');
  }


}



