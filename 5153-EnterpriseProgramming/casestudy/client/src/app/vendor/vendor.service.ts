import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vendor } from './vendor';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(public http: HttpClient) {
  }

  get(): Observable<any> {
    return this.http.get(`http://localhost:8080/vendors`);
  }

  getVendors(): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(`http://localhost:8080/api/vendors`);
  }

  updateVendor(vendor: Vendor): Observable<Vendor> {
    return this.http.put<Vendor>(`http://localhost:8080/api/vendors`, vendor);
  }

}