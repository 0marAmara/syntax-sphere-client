import {Component} from '@angular/core';
import {PostsListComponent} from '../../shared/posts/posts-list/posts-list.component';
import {ButtonComponent} from '../../shared/button/button.component';
import {NewPostFormComponent} from './new-post-form/new-post-form.component';

@Component({
  selector: 'app-posts-page',
  imports: [
    PostsListComponent,
    ButtonComponent,
    NewPostFormComponent,
  ],
  templateUrl: './posts-page.component.html',
  styleUrl: './posts-page.component.scss'
})
export class PostsPageComponent {
  isCreating = false;

  onCreatePost() {
    this.isCreating = true;
  }
}
