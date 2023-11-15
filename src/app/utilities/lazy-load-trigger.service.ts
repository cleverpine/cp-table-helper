import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LazyLoadTriggerService {
  private lazyLoadTrigger = new Subject<void>();

  getLazyLoadTrigger(): Observable<void> {
    return this.lazyLoadTrigger.asObservable();
  }

  triggerLazyLoad(): void {
    this.lazyLoadTrigger.next();
  }
}
