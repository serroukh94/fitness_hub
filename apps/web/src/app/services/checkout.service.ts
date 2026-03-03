import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private http = inject(HttpClient);

  simulateCheckout(productId: string): Observable<{ success: boolean; message: string; entitlement: any }> {
    return this.http.post<any>('/api/checkout/simulate', { productId });
  }
}
