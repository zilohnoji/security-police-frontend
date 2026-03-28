import { Component } from '@angular/core';
import { Sidenav } from "./components/sidenav/sidenav";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-painel-admin',
  imports: [Sidenav, RouterOutlet],
  templateUrl: './painel-admin.html',
  styleUrl: './painel-admin.scss',
})
export class PainelAdmin {

}
