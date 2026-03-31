import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private _localStorage = localStorage;

  SetAccessToken(accessToken: string): void {
    this._localStorage.setItem("access_token", accessToken);
  }

  GetAccessToken(): string {
    return this._localStorage.getItem('access_token') ?? '';
  }

  SetRefreshToken(refreshToken: string): void {
    this._localStorage.setItem("refresh_token", refreshToken);
  }

  GetRefreshToken(): string {
    return this._localStorage.getItem('refresh_token') ?? '';
  }

  ClearTokens(): void {
    this._localStorage.removeItem("access_token");
    this._localStorage.removeItem("refresh_token");
  }
}