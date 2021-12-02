import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertMsg } from '../../models/alert-msg';
import { AlertService } from '../../services/alert/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.less'],
})
export class AlertComponent implements OnInit {
  alerts: AlertMsg[] = [];
  sub: Subscription;

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.sub = this.alertService.alerts$.subscribe((alert) => {
      this.alerts.push(alert);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  remove(idx: number) {
    this.alerts.splice(idx, 1);
  }
}
