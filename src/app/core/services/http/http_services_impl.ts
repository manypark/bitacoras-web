import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpAdapter } from './http_services';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class HttpClientService implements HttpAdapter {
    
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  get<T>(url: string, options?: object): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${url}`, options);
  }

  post<T>(url: string, body: unknown, options?: object): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${url}`, body, options);
  }

  put<T>(url: string, body: unknown, options?: object): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${url}`, body, options);
  }

  patch<T>(url: string, body: unknown, options?: object): Observable<T> {
    return this.http.patch<T>(`${this.baseUrl}${url}`, body, options);
  }

  delete<T>(url: string, options?: object): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${url}`, options);
  }

}