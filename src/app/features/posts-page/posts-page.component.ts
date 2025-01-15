import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {PostsListComponent} from '../../shared/posts/posts-list/posts-list.component';
import {ButtonComponent} from '../../shared/button/button.component';
import {NewPostFormComponent} from './new-post-form/new-post-form.component';
import {PostsService} from '../../core/services/posts.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

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
  private postsService = inject(PostsService);
  private activatedRoute = inject(ActivatedRoute);
  postsSubscription!: Subscription;
  isCreating = false;
  isSearching!: boolean;

//TODO implement the pagination for the search
  ngOnInit() {
    this.postsSubscription = this.postsService.postResponseSubject.subscribe(posts => {
      this.isCreating = false;
    })
    this.isSearching = this.activatedRoute.snapshot.queryParams['query'] !== undefined;
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }

  onCreatePost() {
    this.isCreating = true;
  }
}
