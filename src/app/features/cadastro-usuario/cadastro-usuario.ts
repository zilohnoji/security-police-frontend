import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../core/services/user-service';
import { SignupRequest, SignupResponse } from '../../core/dtos/auth/signup.dto';

@Component({
  selector: 'app-cadastro-usuario',
  imports: [FormsModule, RouterLink],
  templateUrl: './cadastro-usuario.html',
  styleUrl: './cadastro-usuario.scss',
})
export class CadastroUsuario {
  protected email: WritableSignal<string> = signal('');
  protected password: WritableSignal<string> = signal('');
  


  protected userService: UserService = inject(UserService);
  protected router: Router = inject(Router);

  FazerCadastro(): void {
    const body: SignupRequest = {
      email: this.email(),
      password: this.password(),
    };

    this.userService.Signup(body).subscribe({
      next: (response: SignupResponse) => {
        // Redireciona para a tela de ativação usando o email retornado pela API.
        this.router.navigate(['/ativar', response.email]);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
