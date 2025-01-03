import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {PostsListComponent} from '../../shared/posts/posts-list/posts-list.component';
import {ButtonComponent} from '../../shared/button/button.component';
import {NewPostFormComponent} from './new-post-form/new-post-form.component';
import {PostsService} from '../../core/services/posts.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-posts-page',
  imports: [
    PostsListComponent,
    ButtonComponent,
    NewPostFormComponent,
  ],
  templateUrl: './posts-page.component.html',
  styleUrl: './posts-page.component.scss'
})
export class PostsPageComponent implements OnInit, OnDestroy {
  postsService = inject(PostsService);
  postsSubscription!: Subscription;
  isCreating = false;

  ngOnInit() {
    this.postsSubscription=this.postsService.postResponseSubject.subscribe(posts => {
      this.isCreating=false;
    })
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }

  onCreatePost() {
    this.isCreating = true;
  }
}
