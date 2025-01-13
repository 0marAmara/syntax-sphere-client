import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private static readonly ACCESS_TOKEN_KEY = 'access-token';
  private static readonly REFRESH_TOKEN_KEY = 'refresh-token';

  constructor() {}

  get accessToken(): string | null {
    return localStorage.getItem(StorageService.ACCESS_TOKEN_KEY);
  }

  set accessToken(token: string | null) {
    if (token) {
      localStorage.setItem(StorageService.ACCESS_TOKEN_KEY, token);
    } else {
      localStorage.removeItem(StorageService.ACCESS_TOKEN_KEY);
    }
  }

  get refreshToken(): string | null {
    return localStorage.getItem(StorageService.REFRESH_TOKEN_KEY);
  }

  set refreshToken(token: string | null) {
    if (token) {
      localStorage.setItem(StorageService.REFRESH_TOKEN_KEY, token);
    } else {
      localStorage.removeItem(StorageService.REFRESH_TOKEN_KEY);
    }
  }

  set tokens(tokens: { access: string; refresh: string }) {
    this.accessToken = tokens.access;
    this.refreshToken = tokens.refresh;
  }

  clearUserData(): void {
    localStorage.removeItem(StorageService.ACCESS_TOKEN_KEY);
    localStorage.removeItem(StorageService.REFRESH_TOKEN_KEY);
  }
}
