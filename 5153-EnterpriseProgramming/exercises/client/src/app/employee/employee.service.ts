import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(public http: HttpClient) {
  }

  get(): Observable<any> {
    return this.http.get(`http://localhost:8080/employees`);
  }
  
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`http://localhost:8080/api/employees`);
  }

   updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`http://localhost:8080/api/employees`, employee);
  }
}