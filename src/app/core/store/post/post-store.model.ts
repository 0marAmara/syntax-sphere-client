import {PostModel} from '@shared/models/post.model';
import {CommentModel} from '@shared/models/comment.model';

export interface PostStoreModel {
  post?: PostModel;
  comments?: CommentModel[];
  moreComments: boolean;
  loading: boolean;
  error?: string;
}
