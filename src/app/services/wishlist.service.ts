import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

export interface WishlistItem {
  key: string;
  title: string;
  authors: any[];
  cover_id: number;
  publicationYear: number;
}

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlistItems: WishlistItem[] = [];
  private wishlistSubject = new BehaviorSubject<WishlistItem[]>([]);
  public wishlist$ = this.wishlistSubject.asObservable();
  private readonly STORAGE_KEY = 'books_wishlist';
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.loadWishlist();
  }

  private loadWishlist(): void {
    if (this.isBrowser) {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        if (stored) {
            try {
                this.wishlistItems = JSON.parse(stored);
                this.wishlistSubject.next([...this.wishlistItems]);
            } catch (e) {
                console.error('Error parsing wishlist from localStorage', e);
            }
        }
    }
  }

  private saveWishlist(): void {
    if (this.isBrowser) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.wishlistItems));
    }
    this.wishlistSubject.next([...this.wishlistItems]);
  }

  getWishlist(): WishlistItem[] {
    return this.wishlistItems;
  }

  addToWishlist(item: WishlistItem): void {
    if (!this.isInWishlist(item.key)) {
      this.wishlistItems.push(item);
      this.saveWishlist();
    }
  }

  removeFromWishlist(key: string): void {
    this.wishlistItems = this.wishlistItems.filter(item => item.key !== key);
    this.saveWishlist();
  }

  toggleWishlist(item: WishlistItem): boolean {
    if (this.isInWishlist(item.key)) {
      this.removeFromWishlist(item.key);
      return false; // Now removed
    } else {
      this.addToWishlist(item);
      return true; // Now added
    }
  }

  isInWishlist(key: string): boolean {
    return this.wishlistItems.some(item => item.key === key);
  }
}
