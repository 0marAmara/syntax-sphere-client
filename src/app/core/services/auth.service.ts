import {inject, Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {LoginUser, SignupUser} from '../../shared/models/user.model';
import {AuthResponseModel} from './auth-response.model';
import {tap} from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class AuthService{
  private http = inject(HttpService);

  get authTokens(){
    const authTokens:AuthResponseModel={
      refresh:localStorage.getItem('refresh')??'',
      access:localStorage.getItem('access')??'',
    }
    return authTokens;
  }

  signup(user:SignupUser){
    return this.http.post<AuthResponseModel>('signup/',user).pipe(tap(res=> this.authTap(res)));
  }

  login(user:LoginUser){
    return this.http.post<AuthResponseModel>('signin/',user).pipe(tap(res=> this.authTap(res)));
  }

  authTap(response: AuthResponseModel){
    localStorage.setItem('access',response.access);
    localStorage.setItem('refresh',response.refresh);
  }
}
