export interface PostModel {
  id: string;
  title: string;
  content: string;
  url: string;
  user: string;
  posted_at: string;
  like_count: number;
  user_id: number;
  post_id: string;
}

export interface PostElement{
  title: string;
  content: string;
  url?: string;
}

export interface PostResponse {
  previous: string | null;
  next: string | null;
  count: number;
  results: PostModel[];
}

export interface LikeResponse {
  id: string,
  user_id: number,
  post_id: string,
}
