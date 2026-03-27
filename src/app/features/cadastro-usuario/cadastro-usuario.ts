import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../core/services/user-service';
import { SignupUserRequest, SignupUserResponse } from '../../core/dtos/auth/signup.dto';

@Component({
  selector: 'app-cadastro-usuario',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './cadastro-usuario.html',
  styleUrl: './cadastro-usuario.scss',
})
export class CadastroUsuario {
  protected userForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  protected userService = inject(UserService);
  protected router = inject(Router);

  Register(): void {
    const bodyUser: SignupUserRequest = {
      email: this.userForm.value.email ?? '',
      password: this.userForm.value.password ?? ''
    };

    this.userService.Signup(bodyUser).subscribe({
      next: (response: SignupUserResponse) => {
        localStorage.setItem("pass", bodyUser.password);
        this.router.navigate(['/ativar']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
