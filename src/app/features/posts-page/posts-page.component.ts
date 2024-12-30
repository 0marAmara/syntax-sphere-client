import { Component } from '@angular/core';
import {PostsListComponent} from '../../shared/posts/posts-list/posts-list.component';

@Component({
  selector: 'app-posts-page',
  imports: [
    PostsListComponent,
  ],
  templateUrl: './posts-page.component.html',
  styleUrl: './posts-page.component.scss'
})
export class PostsPageComponent {
}
