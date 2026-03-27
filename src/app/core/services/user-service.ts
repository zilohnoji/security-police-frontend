import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginRequest, LoginResponse } from '../dtos/auth/login.dto';
import { ActivationResponse, SignupUserRequest, SignupUserResponse } from '../dtos/auth/signup.dto';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http: HttpClient = inject(HttpClient);

  Login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/api/auth/sign-in`, credentials,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }

  Signup(credentials: SignupUserRequest): Observable<SignupUserResponse> {
    return this.http.post<SignupUserResponse>(`${environment.apiUrl}/api/auth/signin-up`, credentials,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }).pipe(
        tap((response) => {
          localStorage.setItem("email", response.email);
        })
      );
  }

  ActivateAccount(userEmail: string, emailCode: string): Observable<ActivationResponse> {
    return this.http.post<ActivationResponse>(`${environment.apiUrl}/api/auth/${userEmail}/active/${emailCode}`, {},
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }

  RefreshToken(): Observable<LoginResponse> {
    const credentials = {
      refresh_token: localStorage.getItem('refreshToken'),
      expired_access_token: localStorage.getItem('accessToken')
    };

    return this.http.post<LoginResponse>(`${environment.apiUrl}/api/auth/refresh-token`, credentials,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    ).pipe(
      tap((response) => {
        localStorage.setItem('accessToken', response.access_token);
        localStorage.setItem('refreshToken', response.refresh_token);
      }));
  }
}
