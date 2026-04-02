import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginRequest } from '../../features/auth/dtos/request/login.request.dto';
import { LoginResponse } from '../../features/auth/dtos/response/login.response.dto';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LocalStorageService } from './local-storage.service';
import { SignupUserRequest } from '../../features/cadastro/dtos/request/signup-user.request.dto';
import { ActivationResponse } from '../../features/cadastro/dtos/response/activation-user.response.dto';
import { SignupUserResponse } from '../../features/cadastro/dtos/response/signup-user.response.dto';
import { ActivationAccountRequest,  } from '../../features/cadastro/dtos/request/activation-user.request.dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _http: HttpClient = inject(HttpClient);
  private _localStorageService = inject(LocalStorageService);

  Login(credentials: LoginRequest): Observable<LoginResponse> {
    return this._http.post<LoginResponse>(`${environment.apiUrl}/api/auth/sign-in`, credentials,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }

  public ResendEmailCodeConfirmation(userEmail: string): Observable<void> {
    return this._http.post<void>(`${environment.apiUrl}/api/auth/resend-code/${userEmail}`, {}, {
      headers: { "Content-Type": "application/json" }
    });
  }

  Signup(credentials: SignupUserRequest): Observable<SignupUserResponse> {
    return this._http.post<SignupUserResponse>(`${environment.apiUrl}/api/auth/signin-up`, credentials,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  }

  ActivateAccount(credentials: ActivationAccountRequest): Observable<ActivationResponse> {
    return this._http.post<ActivationResponse>(`${environment.apiUrl}/api/auth/${credentials.user_id}/active/${credentials.email_code}`, {},
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }

  RefreshToken(): Observable<LoginResponse> {
    const credentials = {
      refresh_token: this._localStorageService.GetRefreshToken(),
      expired_access_token: this._localStorageService.GetAccessToken()
    };

    return this._http.post<LoginResponse>(`${environment.apiUrl}/api/refresh-token`, credentials,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    ).pipe(tap((response) => {
      this._localStorageService.SetAccessToken(response.access_token);
      this._localStorageService.SetRefreshToken(response.refresh_token);
    }));
  }
}
