import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PersonDetailsResponse } from '../../shared/dtos/response/person/reponse-details.dto';
import { SignupPersonRequest } from '../../features/cadastro/dtos/request/signup-person.request.dto';
import { SignupPersonResponse } from '../../features/cadastro/dtos/response/signup-person.response.dto';
import { DocumentDetailsResponse } from '../../shared/dtos/response/document/response-details.dto';
import { UploadDocumentRequest } from '../../shared/dtos/request/document/request-upload-document.dto';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private http = inject(HttpClient);

  Signup(credentials: SignupPersonRequest, userId: string): Observable<SignupPersonResponse> {
    return this.http.post<SignupPersonResponse>(`${environment.apiUrl}/api/persons/${userId}`, credentials,
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

  UploadPhoto(file: UploadDocumentRequest): Observable<DocumentDetailsResponse> {
    console.log(file);
    return this.http.post<DocumentDetailsResponse>(`${environment.apiUrl}/api/persons/profile/photo/${file.user_id}`, file.file);
  }
}
