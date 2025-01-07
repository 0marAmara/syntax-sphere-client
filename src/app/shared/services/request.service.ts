import { Observable } from 'rxjs';
import {
  HttpClient,
  HttpContext,
  HttpContextToken,
  HttpEvent,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SKIP_AUTH } from 'src/app/core/constants';
import { environment } from '@app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RequestService {

  private http = inject(HttpClient);

  private apiUrlPrefix = environment.baseUrl;

  private getAuthContext(bypassAuth: boolean = false) {
    return new HttpContext().set(SKIP_AUTH, bypassAuth);
  }

  post<T>(url: string, body: any, bypassAuth?: boolean): Observable<T> {
    const fullUrl: string = this.apiUrlPrefix + url;
    const contextConfig = { context: this.getAuthContext(bypassAuth) };
    return this.http.post<T>(fullUrl, body, { ...contextConfig });
  }

  get<T>(
    url: string,
    params?: HttpParams,
    bypassAuth: boolean = false
  ): Observable<T> {
    const fullUrl: string = this.apiUrlPrefix + url;
    const contextConfig = { context: this.getAuthContext(bypassAuth) };
    const opts = params ? { params, ...contextConfig } : { ...contextConfig };
    return this.http.get<T>(fullUrl, opts);
  }

  put<T>(url: string, body: any, bypassAuth: boolean = false): Observable<T> {
    const fullUrl: string = this.apiUrlPrefix + url;
    const contextConfig = { context: this.getAuthContext(bypassAuth) };
    return this.http.put<T>(fullUrl, body, { ...contextConfig });
  }

  patch<T>(url: string, body: any, bypassAuth: boolean = false): Observable<T> {
    const fullUrl: string = this.apiUrlPrefix + url;
    const contextConfig = { context: this.getAuthContext(bypassAuth) };
    return this.http.patch<T>(fullUrl, body, { ...contextConfig });
  }

  delete<T>(url: string, bypassAuth: boolean = false): Observable<T> {
    const fullUrl: string = this.apiUrlPrefix + url;
    const contextConfig = { context: this.getAuthContext(bypassAuth) };
    return this.http.delete<T>(fullUrl, { ...contextConfig });
  }



  // download(
  //   url: string,
  //   body: any,
  //   bypassAuth: boolean = false
  // ): Observable<any> {
  //   const fullUrl: string = this.apiUrlPrefix + url;
  //   const contextConfig = { context: this.getAuthContext(bypassAuth) };
  //   return this.http.post(fullUrl, body, {
  //     ...contextConfig,
  //     responseType: 'blob' as 'json',
  //   });
  // }

  // downloadGet(
  //   url: string,
  //   params?: HttpParams,
  //   bypassAuth: boolean = false
  // ): Observable<any> {
  //   const fullUrl: string = this.apiUrlPrefix + url;
  //   const contextConfig = { context: this.getAuthContext(bypassAuth) };
  //   const opts = params
  //     ? { params, ...contextConfig, responseType: 'blob' as 'json' }
  //     : { ...contextConfig, ...contextConfig, responseType: 'blob' as 'json' };
  //   return this.http.get(fullUrl, opts);
  // }

  // upload(
  //   url: string,
  //   data: FormData,
  //   bypassAuth: boolean = false
  // ): Observable<HttpEvent<any>> {
  //   const fullUrl: string = this.apiUrlPrefix + url;
  //   const contextConfig = { context: this.getAuthContext(bypassAuth) };
  //   const req = new HttpRequest('POST', fullUrl, data, {
  //     reportProgress: true,
  //     responseType: 'json',
  //     ...contextConfig,
  //   });
  //   return this.http.request(req);
  // }


}
