import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private baseUrl: string = environment.baseUrl;

  get<T>(endpoint: string, params?: any): Observable<T> {
    return this.http.get<T>(this.baseUrl + endpoint, {params}).pipe(catchError(this.sessionTimeoutHandler.bind(this)));
  }

  post<T>(endpoint: string, data: any={}): Observable<T> {
    return this.http.post<T>(this.baseUrl + endpoint, data).pipe(catchError(this.sessionTimeoutHandler.bind(this)));
  }

  sessionTimeoutHandler(error: any) {
    console.log(error);
    if (error.status === 401) {
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      this.router.navigate(['/auth/login']);
    }
    return throwError(error);
  }
}
