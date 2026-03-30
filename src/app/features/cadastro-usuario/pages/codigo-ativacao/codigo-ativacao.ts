import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../core/services/user-service';
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

  private _activatedRoute = inject(ActivatedRoute);
  private _userService = inject(UserService);
  private _router = inject(Router);

  private _userId = '';

  ngOnInit(): void {
    this._userId = this._activatedRoute.snapshot.paramMap.get('id') ?? '';

    if (!this._userId) {
      this._router.navigate(['/login']);
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
    let emailCode = '';

    for (const [, value] of Object.entries(this.formCode.value)) {
      emailCode += value;
    }

    if (emailCode.length !== 8) {
      console.log('Código deve ter 8 dígitos');
      return;
    }

    this._userService.ActivateAccount(this._userId, emailCode).subscribe(
      {
        next: (response) => {
          this._router.navigate(['/login']);
        }
      }
    );
  }
}
