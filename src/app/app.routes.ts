import {Routes} from '@angular/router';
import {LoginComponent} from './features/auth/login/login.component';
import {SignupComponent} from './features/auth/signup/signup.component';
import {AuthLayoutComponent} from './shared/auth-layout/auth-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'signup',
        component: SignupComponent,
      }
    ]
  }
];
