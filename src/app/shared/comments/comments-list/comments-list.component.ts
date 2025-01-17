import { Component } from '@angular/core';
import {CommentComponent} from '@shared/comments/comments-list/comment/comment.component';

@Component({
  selector: 'app-comments-list',
  imports: [
    CommentComponent
  ],
  templateUrl: './comments-list.component.html',
  styleUrl: './comments-list.component.scss'
})
export class CommentsListComponent {

}
