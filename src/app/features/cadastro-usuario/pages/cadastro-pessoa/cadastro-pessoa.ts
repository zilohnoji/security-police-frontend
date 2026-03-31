import { Component, inject, OnInit } from '@angular/core';
import { SignupPersonRequest } from '../../dtos/request/signup-person.request.dto';
import { SignupPersonResponse } from '../../dtos/response/signup-person.response.dto';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../../../../core/services/person.service';
import { WizardStep } from '../../components/wizard-step/wizard-step';

@Component({
  selector: 'app-cadastro-pessoa',
  imports: [ReactiveFormsModule, WizardStep],
  templateUrl: './cadastro-pessoa.html',
  styleUrl: './cadastro-pessoa.scss',
})
export class CadastroPessoa implements OnInit {
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

  private _personService = inject(PersonService);
  private _activatedRoute = inject(ActivatedRoute);
  private _router = inject(Router);
  private _userId = '';

  ngOnInit(): void {
    this._userId = this._activatedRoute.snapshot.paramMap.get('id') ?? '';

    if (!this._userId) {
      this._router.navigate(['/cadastro-usuario']);
    }
  }

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

    this._personService.Signup(bodyPerson, this._userId).subscribe({
      next: (response: SignupPersonResponse) => {
        this._router.navigate(['/ativar', this._userId]);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  Cancel(): void {
    this._router.navigate(['/login']);
  }
}
