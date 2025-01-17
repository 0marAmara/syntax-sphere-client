import {Component, inject, input, output} from '@angular/core';
import {LikeIconComponent} from '@shared/icons/like-icon/like-icon.component';
import {PostModel} from '@shared/models/post.model';
import {PostsService} from '@services/posts.service';
import {DatePipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {ButtonComponent} from '@shared/button/button.component';

@Component({
  selector: '[post]',
  imports: [
    LikeIconComponent,
    DatePipe,
    RouterLink,
    ButtonComponent
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
  private postsService = inject(PostsService);
  post = input<PostModel>();
  likeHandler = output();

  onLike() {
    this.postsService.likePost(this.post()!.id).subscribe(() => {
      this.likeHandler.emit();
    })
  }
}
