import { Component, inject, input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../core/services/user-service';
import { ActivationResponse } from '../../dtos/response/activation-user.response.dto';
import { SignupStateService } from '../../../../core/services/signup-state-service';
import { concat, concatMap, retryWhen, tap } from 'rxjs';
import { WizardStep } from '../../components/wizard-step/wizard-step';

@Component({
  selector: 'app-codigo-ativacao',
  imports: [ReactiveFormsModule, WizardStep],
  templateUrl: './codigo-ativacao.html',
  styleUrl: './codigo-ativacao.scss',
})
export class CodigoAtivacao implements OnInit {
  protected formCode = new FormGroup({
    1: new FormControl('', Validators.required),
    2: new FormControl('', Validators.required),
    3: new FormControl('', Validators.required),
    4: new FormControl('', Validators.required),
    5: new FormControl('', Validators.required),
    6: new FormControl('', Validators.required),
    7: new FormControl('', Validators.required),
    8: new FormControl('', Validators.required),
  })

  protected signupStateService = inject(SignupStateService);
  protected userService = inject(UserService);
  protected route = inject(ActivatedRoute);
  protected router = inject(Router);

  ngOnInit(): void {
    if (!localStorage.getItem("email")) {
      this.router.navigate(['/login']);

      console.log("'sfsfsg")
      return;
    }
  }

  NextInput(e: KeyboardEvent): void {
    let input = e.currentTarget as HTMLInputElement;
    let div = input.parentNode?.childNodes;
    let next: ChildNode[] = div ? [...div] : [];
    let currentIndex = next.indexOf(input);
    let isBackspace = e.key == 'Backspace';


    if (isBackspace && div) {
      if (!input.value && currentIndex > 0) {
        (div[currentIndex - 1] as HTMLInputElement).focus();
      }
    } else if (input.value && div && currentIndex < div.length - 1) {
      (div[next.indexOf(input) + 1] as HTMLInputElement).focus();
    }
  }

  FazerAtivacao(): void {
    const email = localStorage.getItem("email");
    const emailCode = `${this.formCode.value[1]}${this.formCode.value[2]}${this.formCode.value[3]}${this.formCode.value[4]}${this.formCode.value[5]}${this.formCode.value[6]}${this.formCode.value[7]}${this.formCode.value[8]}
    `.trim();

    if (!email) {
      this.router.navigate(['/login']);
      return;
    }

    if (emailCode.length !== 8) {
      console.log('Código deve ter 8 dígitos');
      return;
    }

    this.userService.ActivateAccount(email, emailCode).pipe(
      concatMap((response: ActivationResponse) => {
        console.log(response);
        let pass = localStorage.getItem("pass") ?? '';

        return this.userService.Login({ email: email, password: pass }).pipe(
          tap((res) => {
            localStorage.setItem("accessToken", res.access_token);
            localStorage.setItem("refreshToken", res.refresh_token);

            this.router.navigate(['/cadastro-pessoa']);
          })
        );
      })
    ).subscribe();
  }
}
