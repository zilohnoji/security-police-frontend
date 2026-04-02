import { inject, Injectable, signal } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { jwtDecode } from 'jwt-decode';
import { PersonDetailsResponse } from '../../shared/dtos/response/person/reponse-details.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _localStorageService = inject(LocalStorageService);
  private _myProfile = signal<PersonDetailsResponse | null>(null);

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

  GetAuthenticatedUser(): PersonDetailsResponse | null {
    return this._myProfile();
  }

  SetAuthenticatedUser(user: PersonDetailsResponse): void {
    this._myProfile.set(user);
  }

  ClearAuthUser(): void {
    this._myProfile.set(null);
    this._localStorageService.ClearTokens();
  }

  private GetAccessToken(): JwtDecodedResponse {
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
