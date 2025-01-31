import {Component, inject, OnInit, signal} from '@angular/core';
import {CommentsListComponent} from '@shared/comments/comments-list/comments-list.component';
import {ActivatedRoute, Router} from '@angular/router';
import {PostsService} from '@core/services';
import {PostModel} from '@shared/models/post.model';
import {PostComponent} from '@shared/posts/posts-list/post/post.component';
import {PostSkeletonComponent} from '@shared/posts/post-skeleton/post-skeleton.component';
import {CommentsService} from '@services/comments.service';
import {CommentModel} from '@shared/models/comment.model';

@Component({
  selector: 'app-post-page',
  imports: [
    CommentsListComponent,
    PostComponent,
    PostSkeletonComponent,
  ],
  templateUrl: './post-page.component.html',
  styleUrl: './post-page.component.scss'
})
export class PostPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private routerService = inject(Router);
  private postsService = inject(PostsService);
  private commentsService = inject(CommentsService);
  post = signal<PostModel | undefined>(undefined);
  comments: CommentModel[] = [];
  loading = true;

  ngOnInit() {
    const postId = this.route.snapshot.params['id'];
    this.postsService.loadPost(postId).subscribe({
      next: post => {
        this.post.set(post);
      },
      error: (err) => {
        this.routerService.navigate(['/posts']);
      },
      complete: () => {
        this.loading = false;
      }
    });
    this.commentsService.loadComments(postId).subscribe({
      next: commentResponse => {
        this.comments = commentResponse.results;
      }
    })
  }
}
