import {Component, inject, OnInit, signal} from '@angular/core';
import {CommentsListComponent} from '@shared/comments/comments-list/comments-list.component';
import {ActivatedRoute} from '@angular/router';
import {PostsService} from '@core/services';
import {PostModel} from '@shared/models/post.model';
import {PostComponent} from '@shared/posts/posts-list/post/post.component';
import {PostSkeletonComponent} from '@shared/posts/post-skeleton/post-skeleton.component';

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
export class PostPageComponent implements OnInit{
  private route = inject(ActivatedRoute);
  private postsService = inject(PostsService);
  post = signal<PostModel|undefined>(undefined);
  loading = true;
  error:string = '';

  ngOnInit() {
    const postId = this.route.snapshot.params['id'];
    this.postsService.loadPost(postId).subscribe({
      next: post => {
        this.post.set(post);
      },
      error: (err) => {
        this.error = err.error.message;
      },
      complete: () => {
      }
    });
  }
}
