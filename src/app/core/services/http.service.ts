import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  catchError,
  Observable,
  switchMap,
  throwError,
  take,
  of,
  filter,
  BehaviorSubject
} from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { getAuthTokens } from '../../shared/auth-tokens.function';
import { AuthResponseModel } from './auth-response.model';

@Injectable({
  providedIn: 'root' // Makes this service available application-wide
})
export class HttpService {
  private http = inject(HttpClient); // Injects Angular's HttpClient for making HTTP requests
  private router = inject(Router); // Injects Angular's Router for navigation
  private baseUrl: string = environment.baseUrl; // Base URL for API endpoints, fetched from environment
  private isRefreshing = false; // Flag to track if a token refresh is in progress
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null); // BehaviorSubject to manage the refresh token state

  // GET request method
  get<T>(endpoint: string, params?: any): Observable<T> {
    return this.http.get<T>(this.baseUrl + endpoint, { params }).pipe(
      catchError(error => this.sessionTimeoutHandler(error, () => this.get(endpoint, params))) // Handles errors, especially 401 (unauthorized)
    );
  }

  // POST request method
  post<T>(endpoint: string, data: any = {}): Observable<T> {
    return this.http.post<T>(this.baseUrl + endpoint, data).pipe(
      catchError(error => this.sessionTimeoutHandler(error, () => this.post(endpoint, data))) // Handles errors, especially 401 (unauthorized)
    );
  }

  // Handles session timeout and token refresh logic
  sessionTimeoutHandler(error: HttpErrorResponse, retryRequest: () => Observable<any>): Observable<any> {
    if (error.status === 401 && getAuthTokens().refresh) { // Checks if the error is 401 and a refresh token exists
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
            this.clearSession(); // Clear session data
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
      this.clearSession(); // Clear session data
      this.router.navigate(['/auth/login']); // Redirect to login page
    }
    return throwError(() => error); // Throw the original error
  }

  // Handles the token refresh process
  private handleRefreshToken(): Observable<AuthResponseModel> {
    const tokens = getAuthTokens(); // Get the current tokens
    return this.http.post<AuthResponseModel>(`${this.baseUrl}token/refresh/`, { refresh: tokens.refresh }).pipe(
      switchMap(response => { // Switch to the new token response
        localStorage.setItem('refresh', response.refresh); // Update refresh token in localStorage
        localStorage.setItem('access', response.access); // Update access token in localStorage
        return of(response); // Return the response as an observable
      })
    );
  }

  // Clears the session by removing tokens from localStorage
  private clearSession() {
    localStorage.removeItem('access'); // Remove access token
    localStorage.removeItem('refresh'); // Remove refresh token
  }
}
