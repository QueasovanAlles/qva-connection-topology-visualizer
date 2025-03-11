// src/qva-connection-topology-visualizer/src/position-update.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PositionUpdateService {
  private isPollingEnabledSubject = new BehaviorSubject<boolean>(false);
  public isPollingEnabled$: Observable<boolean> = this.isPollingEnabledSubject.asObservable();

  private pollingTimeout: any;

  constructor() {}

  signalActivity(): void {
    this.setPollingEnabled(true);
    if (this.pollingTimeout) {
      clearTimeout(this.pollingTimeout);
    }
    this.pollingTimeout = setTimeout(() => {
      this.setPollingEnabled(false);
    }, 5000);
  }

  setPollingEnabled(enabled: boolean): void {
    this.isPollingEnabledSubject.next(enabled);
  }
}