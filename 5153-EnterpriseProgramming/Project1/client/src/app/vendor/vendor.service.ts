import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vendor } from '@app/vendor/vendor';

import { HttpApiService } from '@app/http-api.service';

@Injectable({
  providedIn: 'root'
})
export class VendorService extends HttpApiService<Vendor>{

  constructor(http: HttpClient) {
    super(http, 'vendors');
  }

  // get(): Observable<any> {
  //   return this.http.get(`http://localhost:8080/vendors`);
  // }

  // getVendors(): Observable<Vendor[]> {
  //   return this.http.get<Vendor[]>(`http://localhost:8080/api/vendors`);
  // }

  // updateVendor(vendor: Vendor): Observable<Vendor> {
  //   return this.http.put<Vendor>(`http://localhost:8080/api/vendors`, vendor);
  // }

  // deleteVendor(id: number): Observable<number> {
  //   return this.http.delete<number>(`http://localhost:8080/api/vendors/${id}`);
  // }

  // createVendor(vendor: Vendor): Observable<Vendor> {
  //   return this.http.post<Vendor>(`http://localhost:8080/api/vendors`, vendor);
  // }

}