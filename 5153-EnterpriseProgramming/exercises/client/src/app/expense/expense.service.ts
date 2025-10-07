import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { HttpApiService } from '@app/http-api.service';
import { Expense } from './expense';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService extends HttpApiService<Expense> { 
  constructor(http: HttpClient) {
    super(http, 'expenses');
  }  
  
}
