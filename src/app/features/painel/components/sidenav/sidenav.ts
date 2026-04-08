import { Component, ElementRef, HostListener, inject, input, signal, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PersonDetailsResponse } from '../../../../shared/dtos/response/person/reponse-details.dto';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-sidenav',
  imports: [RouterLink],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.scss',
})
export class Sidenav {
  public models = input.required<SidenavModel[]>();
  public profileData = input<PersonDetailsResponse | null>(null);

  protected isActive = signal(false);

  private _authService = inject(AuthService);
  private _router = inject(Router);

  @HostListener("document:click", ["$event"])
  OnDocumentClick(event: MouseEvent): void {
    if (!this.isActive()) return;

    const elementClicked = event.target as HTMLElement;
    const nodeChilds = elementClicked;

    if (!nodeChilds.classList.contains('profile-image')) {
      this.isActive.set(false);
    }
  }

  Logout(): void {
    this._authService.ClearAuthUser();
    this._router.navigate(['/login']);
  }
}

export interface SidenavModel {
  label: string,
  router: string,
  icon?: string
}