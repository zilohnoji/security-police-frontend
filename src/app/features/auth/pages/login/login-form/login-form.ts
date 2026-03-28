import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../../../core/services/user-service';
import { LoginRequest } from '../../../dtos/request/login.request.dto';
import { LoginResponse } from '../../../dtos/response/login.response.dto';
import { Observable } from 'rxjs';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-form',
  imports: [FormsModule, RouterLink],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
})
export class LoginForm {
  protected email: WritableSignal<string> = signal('');
  protected password: WritableSignal<string> = signal('');

  protected userService: UserService = inject(UserService);
  public accessToken: WritableSignal<string | null> = signal(null);
  protected router: Router = inject(Router);

  FazerLogin(): void {
    this.userService.Login({ "email": this.email(), "password": this.password() }).subscribe(
      {
        next: response => {
          localStorage.setItem("accessToken", response.access_token);
          localStorage.setItem("refreshToken", response.refresh_token);

          const acc = localStorage.getItem('accessToken');

          if (acc) this.accessToken.set(acc);

          this.router.navigate(["/painel"]);
        },
        error: err => {
          console.log(err)
        }
      }
    );
  }
}
