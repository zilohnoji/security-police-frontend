import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidenav } from "./features/painel/painel-admin/components/sidenav/sidenav";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidenav],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('security-police-mg-front');
}