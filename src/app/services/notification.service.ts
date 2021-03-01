import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private OpenNotification = new Subject<string>();
  OpenNotification$ = this.OpenNotification.asObservable();

  constructor() { }

  executeAction(notification: string) {
    this.OpenNotification.next(notification);
  }
}
