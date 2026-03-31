import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-painel',
  imports: [RouterOutlet],
  templateUrl: './painel.html',
  styleUrl: './painel.scss',
})
export class Painel implements OnInit {
  private _router = inject(Router);
  private _authService = inject(AuthService);

  ngOnInit(): void {
    if (this._authService.GetUserRole() === 'admin') {
      this._router.navigate(['/painel/admin']);
    }

    if (this._authService.GetUserRole() === 'agent') {
      this._router.navigate(['/painel/agent']);
    }
  }
}