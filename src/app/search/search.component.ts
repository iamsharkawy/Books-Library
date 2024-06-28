import { Component } from '@angular/core';
import { HomeComponent } from "../Home/home.component";

@Component({
    selector: 'app-search',
    standalone: true,
    templateUrl: './search.component.html',
    styleUrl: './search.component.scss',
    imports: [HomeComponent]
})
export class SearchComponent {

}
