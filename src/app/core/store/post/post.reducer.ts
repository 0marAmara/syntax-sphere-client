import {createReducer, on} from '@ngrx/store';
import {PostStoreModel} from '@store/post/post-store.model';
import {
  commentsFailure,
  commentsSuccess,
  getComments,
  getPost,
  postFailure,
  postSuccess
} from '@store/post/post.actions';

const initialState: PostStoreModel = {
  loading: false,
  moreComments: false,
}

export const postReducer = createReducer<PostStoreModel>(
  initialState,
  on(getPost, (state, action) => ({...initialState, loading: true})),
// @ts-ignore
  on(postSuccess, (state, post) => ({...state, post: {id: '1'}})),
  on(postFailure, (state, error) => ({...initialState, error: 'An error has occurred'})),
  on(getComments, (state, action) => ({...state, loading: !state.loading})),
  on(commentsSuccess, (state, {moreComments, comments}) => ({...state, loading: false, moreComments, comments})),
  on(commentsFailure, (state, error) => ({...initialState, error: "An error has occured"}))
)
