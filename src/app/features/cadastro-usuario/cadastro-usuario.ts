import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../core/services/user-service';

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

  protected userService: UserService = inject(UserService);
  protected router: Router = inject(Router);

  Register(): void {
    console.log(this.userForm.valid);
    console.log(this.personForm.valid);
    // const body: SignupUserRequest = {
    //   email: this.userForm.get,
    //   password: this.password(),
    // };

    // localStorage.setItem("fullName", this.fullName());
    // localStorage.setItem("birthDate", this.birthDate().toString());
    // localStorage.setItem("gender", this.gender());
    // localStorage.setItem("motherName", this.motherName());
    // localStorage.setItem("fatherName", this.fatherName());
    // localStorage.setItem("street", this.street());
    // localStorage.setItem("number", this.number().toString());
    // localStorage.setItem("neighborhood", this.neighborhood());
    // localStorage.setItem("cityName", this.cityName());
    // localStorage.setItem("cityUf", this.cityUf());

    // this.userService.Signup(body).subscribe({
    //   next: (response: SignupUserResponse) => {
    //     this.router.navigate(['/ativar', response.email]);
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   },
    // });
  }
}
