import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpContext, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {
  BehaviorSubject, catchError, filter,
  Observable, switchMap, take, tap, throwError,
} from 'rxjs';
import {environment} from '@app/environments/environment';
import {SKIP_AUTH} from '@core/constants';
import {StorageService} from '@services/storage.service';
import {Router} from '@angular/router';
import {AuthResponseModel} from '@services/auth-response.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private http = inject(HttpClient);
  private storageService = inject(StorageService);
  private router = inject(Router);

  private apiUrlPrefix = environment.baseUrl;

  private isRefreshing = false; // Flag to track if a token refresh is in progress
  private refreshTokenSubject = new BehaviorSubject<any>(null); // BehaviorSubject to manage the refresh token state

  private getAuthContext(bypassAuth: boolean = false) {
    return new HttpContext().set(SKIP_AUTH, bypassAuth);
  }

  // GET request method
  get<T>(endpoint: string, params?: HttpParams, bypassAuth?: boolean): Observable<T> {
    const fullUrl: string = this.apiUrlPrefix + endpoint;
    const contextConfig = {context: this.getAuthContext(bypassAuth)};
    const opts = params ? {params, ...contextConfig} : {...contextConfig};
    return this.http.get<T>(fullUrl, opts).pipe(
      catchError(err => this.sessionTimeoutHandler(err, () => this.get<T>(endpoint, params)))
    )
  }

  // POST request method
  post<T>(endpoint: string, body: any = {}, bypassAuth?: boolean): Observable<T> {
    const fullUrl: string = this.apiUrlPrefix + endpoint;
    const contextConfig = {context: this.getAuthContext(bypassAuth)};
    return this.http.post<T>(fullUrl, body, {...contextConfig})
  }

  sessionTimeoutHandler(error: HttpErrorResponse, retryRequest: () => Observable<any>): Observable<any> {
    if (error.status === 401 && this.storageService.refreshToken) {
      if (!this.isRefreshing) { // If no refresh is in progress
        this.isRefreshing = true; // Set refreshing flag to true
        this.refreshTokenSubject.next(null); // Reset the refresh token subject

        return this.handleRefreshToken().pipe(
          switchMap((token: any) => { // Switch to the new token once refreshed
            this.isRefreshing = false; // Reset refreshing flag
            this.refreshTokenSubject.next(token.access); // Emit the new access token
            return retryRequest(); // Retry the original request
          }),
          catchError(() => { // Handle errors during token refresh
            this.isRefreshing = false; // Reset refreshing flag
            this.storageService.clearUserData();
            this.router.navigate(['/auth/login']); // Redirect to login page
            return throwError(() => new Error('Session expired')); // Throw an error
          })
        );
      } else { // If a refresh is already in progress
        return this.refreshTokenSubject.pipe(
          filter(token => token != null), // Wait for the new token
          take(1), // Take the first emitted token
          switchMap(() => retryRequest()) // Retry the original request
        );
      }
    }
    if (error.status === 401) { // If 401 and no refresh token exists
      this.storageService.clearUserData();
      this.router.navigate(['/auth/login']); // Redirect to login page
    }
    return throwError(() => error); // Throw the original error
  }

  // Handles the token refresh process
  private handleRefreshToken(): Observable<AuthResponseModel> {
    const refreshToken = this.storageService.refreshToken;
    const endpoint = `token/refresh/`;
    return this.post<AuthResponseModel>(
      endpoint,
      {refresh: refreshToken},
    ).pipe(
      tap(response => {
        this.storageService.tokens=response;
      })
    );
  }
}
