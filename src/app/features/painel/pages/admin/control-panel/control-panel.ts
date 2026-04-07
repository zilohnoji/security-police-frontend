import { AfterViewInit, Component, inject, signal } from '@angular/core';
import { ScaleAdminDetailsResponse, } from '../../../../../shared/dtos/response/scale/response-details.dto';
import { DatePipe } from '@angular/common';
import { ScaleService } from '../../../../../core/services/scale.service';
import { catchError, concatMap, Observable, tap, throwError } from 'rxjs';
import { Page } from '../../../../../shared/dtos/response/page.dto';
import { PersonDetailsResponse } from '../../../../../shared/dtos/response/person/reponse-details.dto';
import { PersonService } from '../../../../../core/services/person.service';
import { RequestExchangeScaleService } from '../../../../../core/services/request-exchange-scale.service';
import { ExchangeScaleResponseDetails } from '../../../../../shared/dtos/response/exchange-scale/response-details.dto';
import { Card } from "../components/card/card";
import { Pageable } from '../../../../../shared/dtos/response/pageable.dto';
import { HttpParams } from '@angular/common/http';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-control-panel',
  imports: [DatePipe, Card, ReactiveFormsModule],
  templateUrl: './control-panel.html',
  styleUrl: './control-panel.scss',
})
export class ControlPanel implements AfterViewInit {
  private readonly _scaleService = inject(ScaleService);
  private readonly _personService = inject(PersonService);
  private readonly _requestExchangeScaleService = inject(RequestExchangeScaleService);

  protected scales = signal<Page<ScaleAdminDetailsResponse> | null>(null);
  protected persons = signal<Page<PersonDetailsResponse> | null>(null);
  protected requestExchangeScales = signal<Page<ExchangeScaleResponseDetails> | null>(null);

  protected pageable = new FormGroup({
    page: new FormControl(1),
    pageSize: new FormControl(5),
    sortDirection: new FormControl('asc'),
    // sortTerm: new FormControl(),
    // searchTerm: new FormControl()
  });

  protected params = signal(new HttpParams()
    .set('page', this.pageable.value.page ?? 1)
    .set('pageSize', this.pageable.value.pageSize ?? 5)
    .set('sortDirection', this.pageable.value.sortDirection ?? "asc"));

  ngAfterViewInit() {

    // .set('sortTerm', this.pageable.value.sortTerm ?? '')
    // .set('searchTerm', this.pageable.value.searchTerm ?? '');

    this._scaleService.GetScales(this.params()).pipe(
      tap((response) => {
        this.scales.set(response);
      })
    ).subscribe();

    this._personService.GetActivePersons().pipe(
      tap((response) => {
        this.persons.set(response);
      })
    ).subscribe()

    this._requestExchangeScaleService.GetRequestsWaitingApprove().pipe(
      tap((response) => {
        this.requestExchangeScales.set(response);
      })
    ).subscribe()
  }

  protected OnSearch(): void {
    this._scaleService.GetScales(this.params()).pipe(
      tap((response) => {
        console.log(this.params());
        this.scales.set(response);
      })
    ).subscribe();
  }

  protected FormatDate(date: Date): string {
    let newDate = new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      minute: '2-digit',
      hour: '2-digit',
    });
    return newDate;
  }

  protected FindAgentsByScaleId(id: string): PersonDetailsResponse[] {
    let filteredAgents: PersonDetailsResponse[] | [] = [];

    this.scales()?.elements.forEach(scale => {
      if (scale.id === id.toString()) {
        filteredAgents = scale.agents;
      }
    })

    if (filteredAgents) {
      return filteredAgents;
    }
    return [];
  }

  protected AnnulRequest(requestId: string): void {
    this._requestExchangeScaleService.AnnulRequestExchangeScale(requestId).pipe(
      tap((response) => {
        console.log(response);
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    ).pipe(
      concatMap((response) => {
        return this._requestExchangeScaleService.GetRequestsWaitingApprove().pipe(
          tap((response) => {
            this.requestExchangeScales.set(response);
          })
        )
      })
    ).subscribe();
  }

  protected ApproveRequest(requestId: string): void {
    this._requestExchangeScaleService.ApproveRequestExchangeScale(requestId).pipe(
      tap((response) => {
        console.log(response);
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    ).pipe(
      concatMap((response) => {
        return this._requestExchangeScaleService.GetRequestsWaitingApprove().pipe(
          tap((response) => {
            this.requestExchangeScales.set(response);
          })
        )
      })
    ).subscribe();
  }

  protected GetActiveScales(): ScaleAdminDetailsResponse[] {
    const filteredScales = this.scales()?.elements.filter(s => s.isCompleted === false);

    if (filteredScales) {
      return filteredScales;
    }

    return [];
  }
}