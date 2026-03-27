import { Component, inject } from '@angular/core';
import { SignupPersonRequest, SignupPersonResponse, SignupUserRequest, SignupUserResponse } from '../../../core/dtos/auth/signup.dto';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupStateService } from '../../../core/services/signup-state-service';
import { PersonServices } from '../../../core/services/person-services';

@Component({
  selector: 'app-cadastro-pessoa',
  imports: [],
  templateUrl: './cadastro-pessoa.html',
  styleUrl: './cadastro-pessoa.scss',
})
export class CadastroPessoa {
  protected personForm = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    birthDate: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    motherName: new FormControl('', [Validators.required]),
    fatherName: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),
    number: new FormControl('', [Validators.required]),
    neighborhood: new FormControl('', [Validators.required]),
    cityName: new FormControl('', [Validators.required]),
    cityUf: new FormControl('', [Validators.required]),
  });

  protected signupStateService = inject(SignupStateService);
  protected personService = inject(PersonServices);
  protected router = inject(Router);

  Register(): void {
    const bodyPerson: SignupPersonRequest = {
      profile: {
        full_name: this.personForm.value.fullName ?? '',
        birth_date: this.personForm.value.birthDate ?? '',
        gender: this.personForm.value.gender ?? '',
        mother_name: this.personForm.value.motherName ?? '',
        father_name: this.personForm.value.fatherName ?? '',
      },
      address: {
        street_type: this.personForm.value.street ?? '',
        street: this.personForm.value.street ?? '',
        number: Number.parseInt(this.personForm.value.number ?? '0') ?? 0,
        neighborhood: this.personForm.value.neighborhood ?? '',
        city: {
          name: this.personForm.value.cityName ?? '',
          uf: this.personForm.value.cityUf ?? '',
        }
      }
    }

    this.personService.Signup(bodyPerson).subscribe({
      next: (response: SignupPersonResponse) => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
