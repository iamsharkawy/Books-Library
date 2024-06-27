import { Component, Input, } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgIf, RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent{
  @Input() authors: any = []
  @Input() cover_id!: string
  @Input() publicationYear!: Number
  @Input() title!: string
  @Input() key!: any


  getCoverImageUrl(cover_id: string): string {
    if (!cover_id) {
      return ''; // Return an empty string if no cover ID
    }

    return `https://covers.openlibrary.org/b/id/${cover_id}.jpg`;
  }

  getAuthorsNames(authors: any[]): string {
    return authors.map(author => author.name).join(', ');
  }


}



