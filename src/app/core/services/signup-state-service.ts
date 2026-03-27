import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SignupStateService {
  private _personData = signal({});

  SetPersonData(data: any) {
    this._personData.set(data);
  }

  ClearData() {
    this._personData.set({});
  }
}
