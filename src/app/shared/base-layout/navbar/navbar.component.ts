import {Component, inject} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  router = inject(Router);

//TODO implement the mobile onSearch
  onSearch(searchField: HTMLInputElement) {
    if (searchField.value.trim().length === 0)
      this.router.navigate(['/']);
    this.router.navigate(['/search'], {
      queryParams: {
        query: searchField.value
      },
    });
  }
}
