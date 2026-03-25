import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ScaleDetailsResponseDto } from '../dtos/scale/scale.dto';
import { Page } from '../dtos/page.dto';

@Injectable({
  providedIn: 'root',
})
export class ScaleService {
  private httpClient = inject(HttpClient);

  GetScales(): Observable<Page<ScaleDetailsResponseDto>> {
    return this.httpClient.get<Page<ScaleDetailsResponseDto>>(`${environment.apiUrl}/api/scales`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
