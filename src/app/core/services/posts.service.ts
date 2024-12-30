import {inject, Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {LikeResponse, PostElement, PostModel, PostResponse} from '../../shared/models/post.model';

@Injectable({
  providedIn: 'root'
})

export class PostsService {
  private http = inject(HttpService);

  loadPosts(limit: number = 10, search: string = "") {
    return this.http.get<PostResponse>('posts/', {limit, search});
  }

  loadSpecificUserPosts(limit: number = 10, username: string) {
    return this.http.get<PostResponse>('posts/user/' + username, {limit});
  }

  likePost(postId: string) {
    return this.http.post<LikeResponse>(`posts/${postId}/like/`);
  }

  addPost(post: PostElement) {
    return this.http.post<PostResponse>(`posts/`, post);
  }

}
