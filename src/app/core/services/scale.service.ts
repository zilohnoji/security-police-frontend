import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ScaleAdminDetailsResponse } from '../../shared/dtos/response/scale/response-details.dto';
import { Page } from '../../shared/dtos/response/page.dto';

@Injectable({
  providedIn: 'root',
})
export class ScaleService {
  private httpClient = inject(HttpClient);

  GetScales(pageable: HttpParams): Observable<Page<ScaleAdminDetailsResponse>> {
    return this.httpClient.get<Page<ScaleAdminDetailsResponse>>(
      `${environment.apiUrl}/api/scales`, {
      params: pageable,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
