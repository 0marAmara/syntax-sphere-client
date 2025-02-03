import {inject} from '@angular/core';
import {PostsService} from '@core/services';
import {CommentsService} from '@services/comments.service';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, of, switchMap} from 'rxjs';
import {
  commentsFailure,
  commentsSuccess,
  getComments,
  getPost,
  postFailure,
  postSuccess
} from '@store/post/post.actions';

export class PostEffects {
  actions$ = inject(Actions);
  private postsService = inject(PostsService);
  loadPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPost),
      switchMap(({id}) => {
        return this.postsService.loadPost(id).pipe(
          map(post => (postSuccess(post))),
          map(({id}) => getComments({id})),
          catchError(error => of(postFailure(error)))
        );
      })
    )
  )

  private commentsService = inject(CommentsService);
  loadComments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getComments),
      switchMap(({id}) => (
          this.commentsService.loadComments(id).pipe(
            map(response => (commentsSuccess({
              comments: response.results, moreComments: response.results.length < response.count
            }))),
            catchError(error => of(commentsFailure(error)))
          )
        )
      )
    ))
}
