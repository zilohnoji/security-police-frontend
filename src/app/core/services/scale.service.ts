import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ScaleDetailsResponse } from '../../shared/dtos/response/scale/response-details.dto';
import { Page } from '../../shared/dtos/response/page.dto';

@Injectable({
  providedIn: 'root',
})
export class ScaleService {
  private httpClient = inject(HttpClient);

  GetScales(): Observable<Page<ScaleDetailsResponse>> {
    return this.httpClient.get<Page<ScaleDetailsResponse>>(`${environment.apiUrl}/api/scales`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
