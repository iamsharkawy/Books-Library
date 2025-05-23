import { Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { SearchComponent } from './search/search.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { HomeComponent } from './Home/home.component';
import { AuthorComponent } from './author/author.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home Page' },
  { path: 'details/:key', component: DetailsComponent, title: 'Details Page' },
  { path: 'search', component: SearchComponent, title: 'Search Page' },
  { path: 'wish-list', component: WishListComponent, title: 'Wish-List Page' },
  { path: 'authors/:key', component: AuthorComponent, title: 'Author Page' },
];
