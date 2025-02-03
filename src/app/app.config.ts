import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {provideHttpClient, withInterceptors,} from '@angular/common/http';
import {AttachAccessTokenInterceptor} from '@interceptors/attach-access-token.interceptor';
import {RefreshTokenInterceptor} from '@interceptors/refresh-token.interceptor';
import {provideStore} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {postReducer} from '@store/post/post.reducer';
import {PostEffects} from '@store/post/post.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(withInterceptors([RefreshTokenInterceptor, AttachAccessTokenInterceptor])),
    provideStore({
      post: postReducer
    }),
    provideEffects([
      PostEffects
    ])
  ],
};
