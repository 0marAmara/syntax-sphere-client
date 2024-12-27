import {inject, Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {PostModel, PostResponse} from '../../shared/models/post.model';

@Injectable({
  providedIn: 'root'
})

export class PostsService{
  private http = inject(HttpService);
  private _posts:PostModel[]=[];
  loadPosts(){
    return this.http.get<PostResponse>('posts/');
  }
}
