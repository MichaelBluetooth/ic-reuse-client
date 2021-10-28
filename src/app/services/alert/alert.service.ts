import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AlertMsg } from 'src/app/models/alert-msg';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private _alerts = new Subject<AlertMsg>();

  get alerts$() {
    return this._alerts.asObservable();
  }

  alert(text: string, type: string) {
    this._alerts.next({ text, type });
  }
}
