import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PersonDetailsResponse } from '../../shared/dtos/response/person/reponse-details.dto';
import { SignupPersonRequest } from '../../features/cadastro/dtos/request/signup-person.request.dto';
import { SignupPersonResponse } from '../../features/cadastro/dtos/response/signup-person.response.dto';
import { DocumentDetailsResponse } from '../../shared/dtos/response/document/response-details.dto';
import { UploadDocumentRequest } from '../../shared/dtos/request/document/request-upload-document.dto';
import { Page } from '../../shared/dtos/response/page.dto';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private _http = inject(HttpClient);

  Signup(credentials: SignupPersonRequest, userId: string): Observable<SignupPersonResponse> {
    return this._http.post<SignupPersonResponse>(`${environment.apiUrl}/api/persons/${userId}`, credentials,
      {
        headers: { "Content-Type": "application/json" }
      });
  }

  MyProfile(): Observable<PersonDetailsResponse> {
    return this._http.get<PersonDetailsResponse>(`${environment.apiUrl}/api/persons/my-profile`,
      {
        headers: { "Content-Type": "application/json" }
      }
    );
  }

  UploadPhoto(file: UploadDocumentRequest): Observable<DocumentDetailsResponse> {
    return this._http.post<DocumentDetailsResponse>(`${environment.apiUrl}/api/persons/profile/photo/${file.user_id}`, file.file);
  }

  GetPersons(): Observable<Page<PersonDetailsResponse>> {
    return this._http.get<Page<PersonDetailsResponse>>(`${environment.apiUrl}/api/persons`,
      {
        headers: { "Content-Type": "application/json" }
      }
    );
  }

  GetActivePersons(): Observable<Page<PersonDetailsResponse>> {
    return this._http.get<Page<PersonDetailsResponse>>(`${environment.apiUrl}/api/persons?searchTerm=true`,
      {
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}
