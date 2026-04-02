import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../../../core/services/user.service';
import { Router, RouterLink } from '@angular/router';
import { catchError, map, throwError } from 'rxjs';
import { LocalStorageService } from '../../../../../core/services/local-storage.service';
import { LoginResponse } from '../../../dtos/response/login.response.dto';

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

  Login(): void {
    this._userService.Login({ "email": this.email(), "password": this.password() }).pipe(
      map((response: LoginResponse) => {
        this._localStorageService.SetAccessToken(response.access_token);
        this._localStorageService.SetRefreshToken(response.refresh_token);
      }),
      catchError((error) => {
        if (error.error.error.includes("inactive")) {
          this._userService.ResendEmailCodeConfirmation(this.email()).subscribe();

          let errorData = error.error.error.split(" ");
          let userId = errorData[errorData.length - 1];

          this._router.navigate(["/ativar", userId]);
        }

        if (error.error.error.includes("person")) {
          let errorData = error.error.error.split(" ");
          let userId = errorData[errorData.length - 1];

          this._router.navigate(['/cadastro-pessoa', userId]);
        }

        return throwError(() => error);
      })

    ).subscribe({
      next: (res) => {
        this._router.navigate(["/painel"]);
      }
    })
  }
}
