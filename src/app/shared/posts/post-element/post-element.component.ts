import {Component, inject, input, output} from '@angular/core';
import {LikeIconComponent} from '@shared/icons/like-icon/like-icon.component';
import {ButtonComponent} from '@shared/button/button.component';
import {RouterLink} from '@angular/router';
import {DatePipe} from '@angular/common';
import {PostsService} from '@core/services';
import {PostModel} from '@shared/models/post.model';

@Component({
  selector: 'app-post-element',
  imports: [
    LikeIconComponent,
    DatePipe
  ],
  templateUrl: './post-element.component.html',
  styleUrl: './post-element.component.scss'
})
export class PostElementComponent {
  private postsService = inject(PostsService);
  post = input<PostModel>();
  likeHandler = output();

  onLike() {
    this.postsService.likePost(this.post()!.id).subscribe(() => {
      this.likeHandler.emit();
    })
  }
}
