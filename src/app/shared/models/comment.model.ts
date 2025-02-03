export interface CommentModel {
  id: string,
  user_id: string,
  post_id:string,
  comment:string,
  posted_at: string,
  username: string,
}

export interface CommentElement {
  comment:string;
}

export interface CommentResponse {
  previous: string | null;
  next: string | null;
  count: number;
  results: CommentModel[];
}
