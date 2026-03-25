import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../core/services/user-service';
import { ActivationResponse } from '../../../core/dtos/auth/signup.dto';

@Component({
  selector: 'app-codigo-ativacao',
  imports: [FormsModule],
  templateUrl: './codigo-ativacao.html',
  styleUrl: './codigo-ativacao.scss',
})
export class CodigoAtivacao implements OnInit {
  protected code: WritableSignal<string> = signal('');
  protected userEmail: WritableSignal<string | null> = signal(null);

  protected userService: UserService = inject(UserService);
  protected route: ActivatedRoute = inject(ActivatedRoute);
  protected router: Router = inject(Router);

  ngOnInit(): void {
    const email = this.route.snapshot.paramMap.get('userEmail');
    if (!email) {
      this.router.navigate(['/cadastro']);
      return;
    }
    this.userEmail.set(email);
  }

  FazerAtivacao(): void {
    const email = this.userEmail();
    const emailCode = this.code();

    if (!email) {
      this.router.navigate(['/cadastro']);
      return;
    }

    if (emailCode.length !== 8) {
      console.log('Código deve ter 8 dígitos');
      return;
    }

    this.userService.ActivateAccount(email, emailCode).subscribe({
      next: (_response: ActivationResponse) => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}

