import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {PostComponent} from '../post/post.component';
import {PostsService} from '@core/services';
import {PostModel} from '../../models/post.model';
import {PostSkeletonComponent} from '../post-skeleton/post-skeleton.component';
import {ButtonComponent} from '../../button/button.component';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-posts-list',
  imports: [
    PostComponent,
    PostSkeletonComponent,
    ButtonComponent
  ],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.scss'
})
export class PostsListComponent implements OnInit, OnDestroy {
  private activatedRoute = inject(ActivatedRoute);
  private postsService = inject(PostsService);
  posts = signal<PostModel[]>([]);
  totalLength: number = 0;
  searchTerm!: string;
  isLoading = true;
  postsSubscription!: Subscription;
  activatedRouteSubscription!: Subscription;

  ngOnInit() {
    this.postsSubscription = this.postsService.postResponseSubject.subscribe(postResponse => {
      if (postResponse && postResponse?.results !== null) {
        this.totalLength = postResponse?.count!;
        this.posts.set(postResponse!.results!);
      }
      this.isLoading = false;
    })
    this.activatedRouteSubscription = this.activatedRoute.queryParams.subscribe(params => {
      this.searchTerm = params['query'] || '';
      this.refresh();
    })
  }

  ngOnDestroy() {
    this.activatedRouteSubscription.unsubscribe();
    this.postsSubscription.unsubscribe();
  }

  loadPosts(loadMore: boolean) {
    this.postsService.loadPosts(loadMore ? this.posts().length + 10 : undefined, this.searchTerm);
  }

  loadMore() {
    this.loadPosts(true);
  }

  refresh() {
    this.loadPosts(false);
  }

}
