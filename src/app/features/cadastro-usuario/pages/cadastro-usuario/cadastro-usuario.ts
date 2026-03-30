import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SignupUserRequest } from '../../dtos/request/signup-user.request.dto';
import { WizardStep } from '../../components/wizard-step/wizard-step';
import { UserService } from '../../../../core/services/user-service';
import { SignupUserResponse } from '../../dtos/response/signup-user.response.dto';

@Component({
  selector: 'app-cadastro-usuario',
  imports: [ReactiveFormsModule, RouterLink, WizardStep],
  templateUrl: './cadastro-usuario.html',
  styleUrl: './cadastro-usuario.scss',
})
export class CadastroUsuario {
  protected userForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  private _userService = inject(UserService);
  private _router = inject(Router);

  Register(): void {
    const bodyUser: SignupUserRequest = {
      email: this.userForm.value.email ?? '',
      password: this.userForm.value.password ?? ''
    };

    this._userService.Signup(bodyUser).subscribe({
      next: (response: SignupUserResponse) => {
        this._router.navigate(['/cadastro-pessoa', response.id]);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
