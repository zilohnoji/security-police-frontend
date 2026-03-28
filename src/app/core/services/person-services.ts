import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SignupPersonRequest } from '../../features/cadastro-usuario/dtos/request/signup-person.request.dto';
import { SignupPersonResponse } from '../../features/cadastro-usuario/dtos/response/signup-person.response.dto';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PersonDetailsResponse } from '../../shared/dtos/response/person/reponse-details.dto';

@Injectable({
  providedIn: 'root',
})
export class PersonServices {
  private http = inject(HttpClient);

  Signup(credentials: SignupPersonRequest): Observable<SignupPersonResponse> {
    return this.http.post<SignupPersonResponse>(`${environment.apiUrl}/api/persons`, credentials,
      {
        headers: { "Content-Type": "application/json" }
      });
  }

  MyProfile(): Observable<PersonDetailsResponse> {
    return this.http.get<PersonDetailsResponse>(`${environment.apiUrl}/api/persons/my-profile`,
      {
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}
