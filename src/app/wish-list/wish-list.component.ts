import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistService, WishlistItem } from '../services/wishlist.service';
import { CardComponent } from '../home/card/card.component';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [CommonModule, CardComponent, RouterLink],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent implements OnInit, OnDestroy {
  wishlistItems: WishlistItem[] = [];
  private wishlistSub!: Subscription;

  constructor(private wishlistService: WishlistService) {}

  ngOnInit(): void {
    this.wishlistSub = this.wishlistService.wishlist$.subscribe(items => {
      this.wishlistItems = items;
    });
  }

  ngOnDestroy(): void {
    if (this.wishlistSub) {
      this.wishlistSub.unsubscribe();
    }
  }
}

