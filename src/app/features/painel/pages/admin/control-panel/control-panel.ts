import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ScaleDetailsResponse } from '../../../../../shared/dtos/response/scale/response-details.dto';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../../../../core/services/auth.service';

@Component({
  selector: 'app-control-panel',
  imports: [DatePipe],
  templateUrl: './control-panel.html',
  styleUrl: './control-panel.scss',
})
export class ControlPanel {
  private readonly _authService = inject(AuthService);
  protected scales = signal<ScaleDetailsResponse[] | null>(null);

  ngAfterViewInit() {
    const authUser = this._authService.GetAuthenticatedUser();

    if (authUser) {
      this.scales.set(authUser.scales);
    }
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