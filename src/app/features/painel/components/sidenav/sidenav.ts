import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PersonDetailsResponse } from '../../../../shared/dtos/response/person/reponse-details.dto';

@Component({
  selector: 'app-sidenav',
  imports: [RouterLink],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.scss',
})
export class Sidenav {
  public models = input.required<SidenavModel[]>();
  public profileData = input<PersonDetailsResponse | null>(null);
}

export interface SidenavModel {
  label: string,
  router: string,
  icon?: string
}