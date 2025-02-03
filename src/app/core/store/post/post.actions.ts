import {createAction, props} from '@ngrx/store';
import {PostModel} from '@shared/models/post.model';
import {CommentModel} from '@shared/models/comment.model';

export const getPost = createAction(
  '[Post] GetPost',
  props<{ id: string }>()
)

export const postSuccess = createAction(
  '[Post] PostSuccess',
  props<PostModel>()
)

export const postFailure = createAction(
  '[Post] PostFailure',
  props<{ error: any }>()
)

export const getComments = createAction(
  '[Post] GetComments',
  props<{ id: string }>()
)

export const commentsSuccess = createAction(
  '[Post] CommentsSuccess',
  props<{ comments: CommentModel[], moreComments: boolean }>()
)

export const commentsFailure = createAction(
  '[Post] CommentsFailure',
  props<{ error: any }>()
)
