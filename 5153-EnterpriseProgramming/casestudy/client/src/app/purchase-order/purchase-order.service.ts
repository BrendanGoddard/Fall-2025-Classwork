import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpApiService } from '@app/http-api.service';
import { PurchaseOrder } from './purchase-order';
import { PurchaseOrderLineItem } from './purchase-order-line-item';

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
  getPurchaseOrdersForVendor(vendorId: number): Observable<PurchaseOrder[]> {
  return this.http.get<PurchaseOrder[]>(`${this.apiURL()}/po/vendor/${vendorId}`);
}

getPurchaseOrderItems(poId: number): Observable<PurchaseOrderLineItem[]> {
  return this.http.get<PurchaseOrderLineItem[]>(`${this.apiURL()}/po/${poId}/items`);
}

getAllByVendorId(vendorId: number): Observable<PurchaseOrder[]> {
  return this.http.get<PurchaseOrder[]>(`${this.apiURL()}/po/vendor/${vendorId}`);
}

  override getById(id: number): Observable<PurchaseOrder> {
  return this.http.get<PurchaseOrder>(`${this.apiURL()}/po/${id}`);
}



}
