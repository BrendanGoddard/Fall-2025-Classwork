import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpApiService } from '@app/http-api.service';
import { PurchaseOrder } from './purchase-order';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService extends HttpApiService<PurchaseOrder> {

  constructor(protected override http: HttpClient) {
    super(http, 'po');
  }

  

  post(po: PurchaseOrder): Observable<PurchaseOrder> {
    return this.http.post<PurchaseOrder>(`${this.apiURL()}/po`, po);
  }

   getVendors(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiURL()}/vendors`);
}

  getAllProducts(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiURL()}/products`);
}

}
