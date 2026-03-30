import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { PersonService } from '../../core/services/person-services';
import { catchError, map } from 'rxjs';

@Component({
  selector: 'app-painel',
  imports: [RouterOutlet],
  templateUrl: './painel.html',
  styleUrl: './painel.scss',
})
export class Painel implements OnInit {
  private _router = inject(Router);
  private _personService = inject(PersonService);

  ngOnInit(): void {
    this._personService.MyProfile().pipe(
      map((response) => {
        const userRole = response.role.toLocaleLowerCase();

        if (userRole === 'admin') this._router.navigate(['/painel/admin']);
        if (userRole === 'agent') this._router.navigate(['/painel/agent']);
      }),
      catchError((error) => {
        return error;
      })
    ).subscribe();
  }

}
