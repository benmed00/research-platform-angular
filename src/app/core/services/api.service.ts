import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

/** Query string values accepted by {@link ApiService.get}. */
export type ApiQueryParams = Record<string, string | number | boolean>;

/** Additional multipart fields for {@link ApiService.uploadFile}. */
export type ApiUploadFields = Record<string, string | Blob>;

/**
 * Authenticated HTTP wrapper that prefixes requests with {@link environment.apiUrl}.
 *
 * @see AuthService.getToken
 * @see AuthInterceptor
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  /**
   * Injects HTTP client and auth service for authenticated API calls.
   *
   * @param http - Angular HTTP client for API requests
   * @param authService - Provides the JWT attached to each request
   */
  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  /**
   * Performs an authenticated GET request.
   *
   * @template T - Expected response body type
   * @param endpoint - Path appended to `environment.apiUrl`
   * @param params - Optional query parameters
   * @returns Observable of the decoded response body
   */
  get<T>(endpoint: string, params?: ApiQueryParams): Observable<T> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach((key) => {
        httpParams = httpParams.set(key, params[key]);
      });
    }

    return this.http.get<T>(`${this.baseUrl}${endpoint}`, {
      headers: this.getHeaders(),
      params: httpParams
    });
  }

  /**
   * Performs an authenticated POST request.
   *
   * @template T - Expected response body type
   * @param endpoint - Path appended to `environment.apiUrl`
   * @param data - JSON-serializable request body
   * @returns Observable of the decoded response body
   */
  post<T>(endpoint: string, data: unknown): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, data, {
      headers: this.getHeaders()
    });
  }

  /**
   * Performs an authenticated PUT request.
   *
   * @template T - Expected response body type
   * @param endpoint - Path appended to `environment.apiUrl`
   * @param data - JSON-serializable request body
   * @returns Observable of the decoded response body
   */
  put<T>(endpoint: string, data: unknown): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${endpoint}`, data, {
      headers: this.getHeaders()
    });
  }

  /**
   * Performs an authenticated DELETE request.
   *
   * @template T - Expected response body type
   * @param endpoint - Path appended to `environment.apiUrl`
   * @returns Observable of the decoded response body
   */
  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${endpoint}`, {
      headers: this.getHeaders()
    });
  }

  /**
   * Uploads a file via multipart POST with optional extra form fields.
   *
   * @param endpoint - Path appended to `environment.apiUrl`
   * @param file - File to upload
   * @param additionalData - Optional extra multipart fields
   * @returns Observable of the server response
   */
  uploadFile(endpoint: string, file: File, additionalData?: ApiUploadFields): Observable<unknown> {
    const formData = new FormData();
    formData.append('file', file);

    if (additionalData) {
      Object.keys(additionalData).forEach((key) => {
        formData.append(key, additionalData[key]);
      });
    }

    return this.http.post(`${this.baseUrl}${endpoint}`, formData);
  }
}
