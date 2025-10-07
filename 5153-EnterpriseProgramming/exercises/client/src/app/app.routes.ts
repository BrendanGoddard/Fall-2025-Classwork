import { Routes } from '@angular/router';
import { Home } from '../app/home/home';
import { EmployeeHome } from './employee/employee-home/employee-home';
import { ExpenseHome } from './expense/expense-home/expense-home';

export const routes: Routes = [
  { path: '', component: Home, },

  // TODO: Replace Home for EmployeeHome component once its created
  { path: 'employees', component: EmployeeHome, },
  { path: 'expenses', component: ExpenseHome, },

];