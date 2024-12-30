import {Component, inject, OnInit, signal} from '@angular/core';
import {PostComponent} from '../post/post.component';
import {PostsService} from '../../../core/services/posts.service';
import {PostModel} from '../../models/post.model';
import {PostSkeletonComponent} from '../post-skeleton/post-skeleton.component';
import {ButtonComponent} from '../../button/button.component';

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
export class PostsListComponent implements OnInit {
  private postsService = inject(PostsService);
  posts = signal<PostModel[]>([]);
  totalLength: number = 0;
  isLoading = true;

  ngOnInit() {
    this.refresh();
  }

  loadPosts(loadMore: boolean) {
    this.isLoading = true;
    this.postsService.loadPosts(loadMore ? this.posts().length + 10 : undefined).subscribe({
      next: next => {
        this.posts.set(next.results);
        this.totalLength= next.count;
        this.isLoading = false;
      }
    })
  }

  loadMore() {
    this.loadPosts(true);
  }

  refresh() {
    this.loadPosts(false);
  }

}
