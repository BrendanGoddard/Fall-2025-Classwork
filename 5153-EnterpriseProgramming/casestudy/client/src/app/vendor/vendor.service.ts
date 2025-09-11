import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(public http: HttpClient) {
  }

  get(): Observable<any> {
    return this.http.get(`http://localhost:8080/vendors`);
  }
}