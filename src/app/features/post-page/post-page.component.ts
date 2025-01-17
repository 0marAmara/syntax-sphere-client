import { Component } from '@angular/core';
import {PostElementComponent} from '@shared/posts/post-element/post-element.component';
import {CommentsListComponent} from '@shared/comments/comments-list/comments-list.component';
import {PostSkeletonComponent} from '@shared/posts/post-skeleton/post-skeleton.component';

@Component({
  selector: 'app-post-page',
  imports: [
    PostElementComponent,
    CommentsListComponent,
    PostSkeletonComponent
  ],
  templateUrl: './post-page.component.html',
  styleUrl: './post-page.component.scss'
})
export class PostPageComponent {

}
