import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '@app/employee/employee';

import { HttpApiService } from '@app/http-api.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends HttpApiService<Employee> {
  constructor(http: HttpClient) {
    super(http, 'employees');
  }
}