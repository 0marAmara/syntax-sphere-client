import {inject, Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {LikeResponse, PostElement, PostModel, PostResponse} from '@shared/models/post.model';
import {BehaviorSubject, catchError, tap} from 'rxjs';
import {HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private http = inject(HttpService);
  private _postResponse?: PostResponse;
  postResponseSubject = new BehaviorSubject<PostResponse | undefined>(this._postResponse);

  loadPosts(limit: number = 10, search: string = ''): void {
    const params = new HttpParams().set('limit', limit).set('search', search);
    this.http
      .get<PostResponse>('posts/', params)
      .pipe(
        tap((response) => {
          this._postResponse = response;
          this.postResponseSubject.next(this._postResponse);
        }),
        catchError((error) => {
          console.error('Failed to load posts:', error);
          throw error;
        }),
      ).subscribe();
  }

  loadSpecificUserPosts(limit: number = 10, username: string) {

    const params = new HttpParams().set('limit', limit);

    return this.http.get<PostResponse>(`posts/user/${username}`, params).pipe(
      catchError((error) => {
        console.error('Failed to load user posts:', error);
        throw error;
      }),
    );
  }

  likePost(postId: string) {
    return this.http.post<LikeResponse>(`posts/${postId}/like/`).pipe(
      catchError((error) => {
        console.error('Failed to like post:', error);
        throw error;
      })
    );
  }

  addPost(post: PostElement) {
    return this.http.post<PostModel>('posts/', post).pipe(
      catchError((error) => {
        console.error('Failed to add post:', error);
        throw error;
      })
    );
  }
}
