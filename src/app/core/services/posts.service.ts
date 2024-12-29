import {inject, Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {LikeResponse, PostModel, PostResponse} from '../../shared/models/post.model';
import {catchError, throwError} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class PostsService {
  private http = inject(HttpService);
  private router = inject(Router);
  private _posts: PostModel[] = [];

  loadPosts() {
    // TODO implement post pagination
    return this.http.get<PostResponse>('posts/');
  }

  likePost(postId:string) {
    return this.http.post<LikeResponse>(`posts/${postId}/like/`);
  }

}
