import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {PostComponent} from '@shared/posts/posts-list/post/post.component';
import {PostsService} from '@core/services';
import {PostModel} from '../../models/post.model';
import {PostSkeletonComponent} from '../post-skeleton/post-skeleton.component';
import {ButtonComponent} from '../../button/button.component';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {PaginationComponent} from '@shared/pagination/pagination.component';

@Component({
  selector: 'app-posts-list',
  imports: [
    PostComponent,
    PostSkeletonComponent,
    ButtonComponent,
    PaginationComponent
  ],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.scss'
})
export class PostsListComponent implements OnInit, OnDestroy {
  private activatedRoute = inject(ActivatedRoute);
  private postsService = inject(PostsService);
  protected readonly Math = Math;
  currentPage = 1;
  posts = signal<PostModel[]>([]);
  totalLength: number = 0;
  searchTerm!: string;
  isLoading = true;
  postsSubscription!: Subscription;
  activatedRouteSubscription!: Subscription;
  pageSubscription!: Subscription;

  ngOnInit() {
    this.postsSubscription = this.postsService.postResponseSubject.subscribe(postResponse => {
      if (postResponse) {
        if (postResponse.results !== null) {
          this.totalLength = postResponse?.count!;
          this.posts.set(postResponse!.results!);
        }
        this.isLoading = false;
      }
    })
    if (this.searchTerm !== '') {
      this.pageSubscription = this.activatedRoute.params.subscribe(params => {
        this.currentPage = parseInt(params['page']) || 1;
        this.refresh()
      })
    }
    this.activatedRouteSubscription = this.activatedRoute.queryParams.subscribe(params => {
      this.searchTerm = params['query'] || '';
      this.refresh();
    })
  }

  ngOnDestroy() {
    this.activatedRouteSubscription.unsubscribe();
    this.postsSubscription.unsubscribe();
    this.pageSubscription.unsubscribe();
  }

  loadPosts(loadMore: boolean) {
    if(this.currentPage>1){
      this.postsService.loadPosts(undefined, this.searchTerm,(this.currentPage-1)*10);
      return;
    }
    this.postsService.loadPosts(loadMore ? this.posts().length + 10 : undefined, this.searchTerm);
  }

  loadMore() {
    this.loadPosts(true);
  }

  refresh() {
    this.loadPosts(false);
  }

}
