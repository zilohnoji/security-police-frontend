import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ScaleService } from '../../../../../core/services/scale-service';
import { ScaleDetailsResponse } from '../../../../../shared/dtos/response/scale/response-details.dto';
import { Page } from '../../../../../shared/dtos/response/page.dto';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-control-panel',
  imports: [DatePipe],
  templateUrl: './control-panel.html',
  styleUrl: './control-panel.scss',
})
export class ControlPanel {
  private scaleService = inject(ScaleService);
  protected scales: WritableSignal<Page<ScaleDetailsResponse> | null> = signal(null);

  ngAfterViewInit() {
    this.scaleService.GetScales().subscribe((response) => {
      this.scales.set(response);
    });
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
}