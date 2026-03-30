import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../../../core/services/user-service';
import { Router, RouterLink } from '@angular/router';
import { tap } from 'rxjs';
import { LocalStorageService } from '../../../../../core/services/local-storage';

@Component({
  selector: 'app-login-form',
  imports: [FormsModule, RouterLink],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
})
export class LoginForm {
  protected email: WritableSignal<string> = signal('');
  protected password: WritableSignal<string> = signal('');

  private _userService: UserService = inject(UserService);
  private _localStorageService = inject(LocalStorageService);
  private _router: Router = inject(Router);

  FazerLogin(): void {
    this._userService.Login({ "email": this.email(), "password": this.password() }).pipe(
      tap((response) => {
        this._localStorageService.SetAccessToken(response.access_token);
        this._localStorageService.SetRefreshToken(response.refresh_token);
      })
    ).subscribe({ next: (res) => this._router.navigate(["/painel"]) })
  }
}
