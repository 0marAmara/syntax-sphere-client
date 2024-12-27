import {Routes} from '@angular/router';
import {LoginComponent} from './features/auth/login/login.component';
import {SignupComponent} from './features/auth/signup/signup.component';
import {AuthLayoutComponent} from './shared/auth-layout/auth-layout.component';
import {BaseLayoutComponent} from './shared/base-layout/base-layout.component';
import {PostsPageComponent} from './features/posts-page/posts-page.component';

export const routes: Routes = [
  {
    path: 'auth',
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
    ],
  },
  {
    path: '',
    component: BaseLayoutComponent,
    children:[
      {
        path: 'posts',
        component:PostsPageComponent
      }
    ]
  }


];
