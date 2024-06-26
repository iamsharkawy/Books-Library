import { Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { SearchComponent } from './search/search.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { HomeComponent } from './Home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home Page' },
  { path: 'details', component: DetailsComponent, title: 'Details Page' },
  { path: 'search', component: SearchComponent, title: 'Search Page' },
  { path: 'wish-list', component: WishListComponent, title: 'Wish-List Page' },
];
