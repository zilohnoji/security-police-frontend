import { Component, input, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  imports: [RouterLink],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.scss',
})
export class Sidenav {
  public models = input.required<SidenavModel[]>();

}

export interface SidenavModel {
  label: string,
  router: string,
  icon?: string
}