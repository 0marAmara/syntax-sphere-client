import { inject, Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { LoginUser, SignupUser } from '../../shared/models/user.model';
import { AuthResponseModel } from './auth-response.model';
import { tap } from 'rxjs';
import { StorageService } from '@app/shared/services';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpService);
  private storage = inject(StorageService);

  signup(user: SignupUser) {
    return this.http
      .post<AuthResponseModel>('signup/', user)
      .pipe(
        tap((res) => this.setTokens(res)));
  }

  login(user: LoginUser) {
    return this.http
      .post<AuthResponseModel>('signin/', user)
      .pipe(
        tap((res) => this.setTokens(res)));
  }

  setTokens(response: AuthResponseModel) {
    this.storage.tokens = response;
  }

  logout() {
    this.storage.clearUserData();
  }
}
