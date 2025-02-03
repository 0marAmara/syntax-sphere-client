import {createFeatureSelector, createSelector} from '@ngrx/store';
import {PostStoreModel} from '@store/post/post-store.model';

const selectPostState = createFeatureSelector<PostStoreModel>('post');

export const selectPost = createSelector(
  selectPostState,
  (state) => state.post,
);

export const selectComments = createSelector(
  selectPostState,
  (state) => state.comments,
);

export const selectIsLoading = createSelector(
  selectPostState,
  (state) => state.loading,
)

export const selectMoreComments = createSelector(
  selectPostState,
  (state) => state.moreComments,
)
