import {inject, Injectable} from '@angular/core';
import {HttpService} from '@services/http.service';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {CommentElement, CommentModel, CommentResponse} from '@shared/models/comment.model';
import {HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CommentsService {
  private httpService = inject(HttpService);
  private _commentsResponse?: CommentResponse;
  commmentsResponseSubject = new BehaviorSubject<CommentResponse | undefined>(this._commentsResponse);

  loadComments(postId: string, loadMore = false) {
    const limit = (loadMore ? (this._commentsResponse!.results.length + 10) : (10)) || 10;
    const params = new HttpParams().set('limit', limit);
    return this.httpService.get<CommentResponse>(`posts/${postId}/comments/`, params).pipe(
      tap((response) => {
        this._commentsResponse = response;
        this.commmentsResponseSubject.next(this._commentsResponse);
      })
    )
  }

  addComment(comment: CommentElement, postId: string): Observable<CommentModel> {
    return this.httpService.post<CommentModel>(`posts/${postId}/comments/`, comment);
  }
}
