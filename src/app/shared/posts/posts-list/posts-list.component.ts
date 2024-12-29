import {Component, inject, OnInit, signal} from '@angular/core';
import {PostComponent} from '../post/post.component';
import {PostsService} from '../../../core/services/posts.service';
import {PostModel} from '../../models/post.model';
import {PostSkeletonComponent} from '../post-skeleton/post-skeleton.component';

@Component({
  selector: 'app-posts-list',
  imports: [
    PostComponent,
    PostSkeletonComponent
  ],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.scss'
})
export class PostsListComponent implements OnInit {
  private postsService = inject(PostsService);
  posts = signal<PostModel[]>([]);
  isLoading = true;

  ngOnInit() {
    this.postsService.loadPosts().subscribe({
        next: next => {
          this.posts.set(next.results);
          this.isLoading = false;
        },
      }
    )
  }



}
