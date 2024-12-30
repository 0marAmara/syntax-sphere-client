import {Component, inject, input, output} from '@angular/core';
import {LikeIconComponent} from '../../icons/like-icon/like-icon.component';
import {PostModel} from '../../models/post.model';
import {PostsService} from '../../../core/services/posts.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'li[post]',
  imports: [
    LikeIconComponent,
    DatePipe
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
  private postsService=inject(PostsService);
  post = input<PostModel>();
  likeHandler = output();

  onLike() {
    this.postsService.likePost(this.post()!.id).subscribe(()=>{
      this.likeHandler.emit();
    })
  }
}
