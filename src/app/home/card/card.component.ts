import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Author } from '../../models/book.model';
import { WishlistService } from '../../services/wishlist.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgIf, RouterLink, NgFor, NgClass],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit, OnDestroy {
  @Input() authors: Author[] = []
  @Input() cover_id?: number | null;
  @Input() publicationYear!: number
  @Input() title!: string
  @Input() key!: string

  isWishlisted: boolean = false;
  private wishlistSub!: Subscription;

  constructor(private wishlistService: WishlistService) {}

  ngOnInit() {
    // Listen to wishlist changes to update UI across components
    this.wishlistSub = this.wishlistService.wishlist$.subscribe(items => {
        this.isWishlisted = items.some(item => item.key === this.key);
    });
  }

  ngOnDestroy() {
    if (this.wishlistSub) {
      this.wishlistSub.unsubscribe();
    }
  }

  toggleWishlist(event: Event) {
    event.preventDefault(); // Prevent navigating if wrapped in a link
    event.stopPropagation();
    
    this.wishlistService.toggleWishlist({
      key: this.key,
      title: this.title,
      authors: this.authors,
      cover_id: this.cover_id || 0,
      publicationYear: this.publicationYear
    });
  }

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




