import { inject, Injectable, signal } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _localStorageService = inject(LocalStorageService);

  AccessTokenHasExpired(): boolean {
    return this.GetExpiryDate() < new Date(Date.now());
  }

  GetExpiryDate(): Date {
    return new Date(this.GetAccessToken().exp * 1000);
  }

  GetUserRole(): string {
    if (!this._localStorageService.GetAccessToken()) {
      return '';
    }
    return this.GetAccessToken().role.toLocaleLowerCase();
  }

  GetAccessToken(): JwtDecodedResponse {
    const decodedJwt: JwtDecodedResponse = jwtDecode(this._localStorageService.GetAccessToken());
    return decodedJwt;
  }
}

export interface JwtDecodedResponse {
  aud: string,
  iss: string,
  exp: number,
  sub: string,
  email: string,
  iat: number,
  role: string
}
