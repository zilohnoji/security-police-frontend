import { Component, inject, OnInit, signal } from '@angular/core';
import { SignupPersonRequest } from '../../dtos/request/signup-person.request.dto';
import { SignupPersonResponse } from '../../dtos/response/signup-person.response.dto';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../../../../core/services/person.service';
import { WizardStep } from '../../components/wizard-step/wizard-step';
import { catchError, tap, throwError } from 'rxjs';
import { DocumentDetailsResponse } from '../../../../shared/dtos/response/document/response-details.dto';

@Component({
  selector: 'app-cadastro-pessoa',
  imports: [ReactiveFormsModule, WizardStep, FormsModule],
  templateUrl: './cadastro-pessoa.html',
  styleUrl: './cadastro-pessoa.scss',
})
export class CadastroPessoa implements OnInit {
  protected photoInput = '';
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

  protected profilePhoto = signal<DocumentDetailsResponse | null>(null);

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

  UploadFile(e: Event): void {
    let files = null;

    if (e.target) {
      files = (e.target as HTMLInputElement).files;
    }

    let file = null;

    if (files && files.length > 0) {
      file = files[0];
    }

    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      this._personService.UploadPhoto({ user_id: this._userId, file: formData }).pipe(
        tap((response) => {
          this.profilePhoto.set(response);
        }),
        catchError((error) => {
          console.log(error);
          return throwError(() => error);
        })
      ).subscribe();
    }
  }
}
