import {HttpClient, HttpHeaders,} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {LoadingService} from './loading.service';
import {finalize,} from 'rxjs';
import {RequestParam} from '../types/request-param';
import {environment} from '../../environments/environment';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  constructor(
    private http: HttpClient,
    private loadingService: LoadingService,
  ) {
  }

  getUrl(path: string, queryParams?: { [key: string]: any }) {
    let arr = path.split('/').filter((v) => v);
    arr.unshift(environment.apiBaseUrl);
    const urlPath = arr.join('/');
    if (queryParams) {
      this.clean(queryParams, true);
      const url = new URL(urlPath);
      for (const [key, value] of Object.entries(queryParams)) {
        url.searchParams.append(key, value);
      }
      return url.toString();
    }

    return urlPath;
  }

  get<T>(path: string, request: RequestParam = {}) {
    const url = this.getUrl(path);
    this.clean(request.data, true);
    if (request.isLoading) {
      this.loadingService.setLoading(true);
    }
    return this.http.get<T>(url, {params: request.data}).pipe(
      finalize(() => this.finalizeRequest(request.isLoading)),
    );
  }

  getBlob(path: string, request: RequestParam = {}) {
    const url = this.getUrl(path);
    this.clean(request.data, true);
    if (request.isLoading) {
      this.loadingService.setLoading(true);
    }
    return this.http
      .get(url, {params: request.data, responseType: 'blob'})
      .pipe(
        finalize(() => this.finalizeRequest(request.isLoading)),
      );
  }

  getJSON<T>(path: string, request: RequestParam = {}) {
    const url = this.getUrl(path);
    this.clean(request.data, true);
    if (request.isLoading) {
      this.loadingService.setLoading(true);
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get<T>(url, {params: request.data, headers}).pipe(
      finalize(() => this.finalizeRequest(request.isLoading)),
    );
  }

  post<T>(path: string, request: RequestParam) {
    const url = this.getUrl(path);
    this.clean(request.data);
    if (request.isLoading) {
      this.loadingService.setLoading(true);
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    request.data = this.toFormData(request.data);
    return this.http.post<T>(url, request.data, {headers}).pipe(
      finalize(() => this.finalizeRequest(request.isLoading)),
    );
  }

  postJSON<T>(path: string, request: RequestParam) {
    const url = this.getUrl(path);
    this.clean(request.data);
    if (request.isLoading) {
      this.loadingService.setLoading(true);
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<T>(url, request.data, {headers}).pipe(
      finalize(() => this.finalizeRequest(request.isLoading)),
    );
  }

  private clean(obj: any, isCleanQuery = false) {
    for (const propName in obj) {
      if (
        obj[propName] === undefined ||
        (isCleanQuery && obj[propName] === null)
      ) {
        delete obj[propName];
      } else if (obj[propName] instanceof Date) {
        (obj[propName] as Date).setMilliseconds(0);
        obj[propName] = (obj[propName] as Date).toISOString();
      } else if (
        typeof obj[propName] == 'object' &&
        !(obj[propName] instanceof File)
      ) {
        this.clean(obj[propName]);
      }
    }
  }

  private finalizeRequest(is_loading?: boolean) {
    if (is_loading) {
      this.loadingService.setLoading(false);
    }
  }

  private toFormData(formValue: any) {
    const formData = new FormData();
    //to append files to last of form data
    const fileKeys = [];
    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      if (typeof value.name == 'string') {
        fileKeys.push(key);
        continue;
      }
      formData.append(key, value);
    }
    for (const key of fileKeys) {
      formData.append(key, formValue[key]);
    }
    return formData;
  }

  deleteJSON<T>(path: string, request: RequestParam = {}) {
    const url = this.getUrl(path);
    this.clean(request.data);
    if (request.isLoading) {
      this.loadingService.setLoading(true);
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.delete<T>(url, { headers, params: request.data }).pipe(
      catchError((err) => err),
      finalize(() => {
        this.finalizeRequest(request.isLoading);
      })
    );
  }
}
