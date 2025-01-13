import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpContext, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '@app/environments/environment';
import {SKIP_AUTH} from '@core/constants';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private http = inject(HttpClient);
  private apiUrlPrefix = environment.baseUrl;

  private getAuthContext(bypassAuth: boolean = false) {
    return new HttpContext().set(SKIP_AUTH, bypassAuth);
  }

  // GET request method
  get<T>(endpoint: string, params?: HttpParams, bypassAuth?: boolean): Observable<T> {
    const fullUrl: string = this.apiUrlPrefix + endpoint;
    const contextConfig = {context: this.getAuthContext(bypassAuth)};
    const opts = params ? {params, ...contextConfig} : {...contextConfig};
    return this.http.get<T>(fullUrl, opts);
  }

  // POST request method
  post<T>(endpoint: string, body: any = {}, bypassAuth?: boolean): Observable<T> {
    const fullUrl: string = this.apiUrlPrefix + endpoint;
    const contextConfig = {context: this.getAuthContext(bypassAuth)};
    return this.http.post<T>(fullUrl, body, {...contextConfig})
  }
}
