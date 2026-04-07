import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ExchangeScaleResponseDetails } from '../../shared/dtos/response/exchange-scale/response-details.dto';
import { Page } from '../../shared/dtos/response/page.dto';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestExchangeScaleService {
  private _http = inject(HttpClient);

  public GetRequestsWaitingApprove(): Observable<Page<ExchangeScaleResponseDetails>> {
    return this._http.get<Page<ExchangeScaleResponseDetails>>(`${environment.apiUrl}/api/exchange-scale/waiting-approve`, {
      headers: { "Content-Type": "application/json" }
    });
  }

  public AnnulRequestExchangeScale(requestId: string): Observable<ExchangeScaleResponseDetails> {
    return this._http.post<ExchangeScaleResponseDetails>(`${environment.apiUrl}/api/exchange-scale/${requestId}/annul`, {}, {
      headers: { "Content-Type": "application/json" }
    });
  }

  public ApproveRequestExchangeScale(requestId: string): Observable<ExchangeScaleResponseDetails> {
    return this._http.post<ExchangeScaleResponseDetails>(`${environment.apiUrl}/api/exchange-scale/${requestId}/approve`, {}, {
      headers: { "Content-Type": "application/json" }
    });

  }
}
