import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { User, UserResponse, SingleUserResponse } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'https://reqres.in/api/users';
  private cache = new Map<string, any>();
  private httpOptions = {
    headers: new HttpHeaders({
      'x-api-key': 'reqres-free-v1'
    })
  };

  constructor(private http: HttpClient) { }

  getUsers(page: number): Observable<UserResponse> {
    const cacheKey = `users-page-${page}`;
    
    if (this.cache.has(cacheKey)) {
      return of(this.cache.get(cacheKey));
    }

    return this.http.get<UserResponse>(`${this.baseUrl}?page=${page}`, this.httpOptions).pipe(
      tap(response => this.cache.set(cacheKey, response)),
      catchError(this.handleError)
    );
  }

  getUserById(id: number): Observable<User> {
    const cacheKey = `user-${id}`;
    
    if (this.cache.has(cacheKey)) {
      return of(this.cache.get(cacheKey));
    }

    return this.http.get<SingleUserResponse>(`${this.baseUrl}/${id}`, this.httpOptions).pipe(
      map(response => response.data),
      tap(user => this.cache.set(cacheKey, user)),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      if (error.status === 404) {
        errorMessage = 'User not found';
      } else {
        errorMessage = `Server error: ${error.status}`;
      }
    }
    
    return throwError(() => new Error(errorMessage));
  }
}