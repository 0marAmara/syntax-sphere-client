import {inject, Injectable} from '@angular/core';
import {HttpService} from '@services/http.service';
import {Observable} from 'rxjs';
import {CommentElement, CommentModel, CommentResponse} from '@shared/models/comment.model';

@Injectable({
  providedIn: 'root'
})

export class CommentsService {
  private httpService = inject(HttpService);

  loadComments(postId: string): Observable<CommentResponse> {
    return this.httpService.get<CommentResponse>(`posts/${postId}/comments/`);
  }

  addComment(comment: CommentElement,postId:string): Observable<CommentModel> {
    return this.httpService.post<CommentModel>(`posts/${postId}/comments/`, comment);
  }
}
