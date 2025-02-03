import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {selectIsLoading, selectPost} from '@store/post/post.selectors';
import {getPost} from '@store/post/post.actions';
import {AsyncPipe} from '@angular/common';
import {PostSkeletonComponent} from '@shared/posts/post-skeleton/post-skeleton.component';
import {PostComponent} from '@shared/posts/posts-list/post/post.component';

@Component({
  selector: 'app-post-page',
  imports: [
    AsyncPipe,
    PostSkeletonComponent,
    PostComponent
  ],
  templateUrl: './post-page.component.html',
  styleUrl: './post-page.component.scss'
})
export class PostPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private routerService = inject(Router);
  private store = inject(Store);
  post$ = this.store.select(selectPost);
  isLoading$ = this.store.select(selectIsLoading);

  ngOnInit() {
    const postId = this.route.snapshot.params['id'];
    this.store.dispatch(getPost({id: postId}));
  }
}
