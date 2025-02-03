import {Component, input, InputSignal} from '@angular/core';
import {CommentModel} from '@shared/models/comment.model';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'li [comment]',
  imports: [
    DatePipe
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
  commentObj = input<CommentModel>() as InputSignal<CommentModel>;
}
