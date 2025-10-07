import { Component, OnInit, signal } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';

import { Employee } from '@app/employee/employee';
import { EmployeeService } from '@app/employee/employee.service';

import { Expense } from '@app/expense/expense';
import { ExpenseService } from '@app/expense/expense.service';
import { EXPENSE_DEFAULT } from '@app/constants';
import { ExpenseDetails } from '@app/expense/expense-details/expense-details';


@Component({
  selector: 'app-expense-home',
  imports: [CommonModule, MatCardModule, MatTableModule, MatIconModule, ExpenseDetails],
  templateUrl: './expense-home.html',
  styleUrl: './expense-home.scss'
})
export class ExpenseHome implements OnInit {
  constructor(public expenseService: ExpenseService, public employeeService: EmployeeService) {
  }

  tableColumns: string[] = ['id', 'employeeId', 'date']; // Defines column order

  // Data
  expenseInDetail = signal<Expense>(EXPENSE_DEFAULT)
  expensesTable = new MatTableDataSource<Expense>();
  employees = signal<Employee[]>([]);

  ngOnInit(): void {
    this.loadExpenses();
    this.loadEmployees();
  }

  loadExpenses() {
    this.expenseService.getAll().subscribe({
      next: (payload: Expense[]) => {
        this.expensesTable.data = payload; // Add the array to the table
      },
      error: e => console.log(e)
    });
  }

  loadEmployees() {
    this.employeeService.getAll().subscribe({
      next: (payload: Employee[]) => this.employees.set(payload),
      error: e => console.log(e)
    });
  }

  selectExpense(expense: Expense) {
    this.expenseInDetail.set(expense);
  }

  hasSelectedExpense() {
    return this.expenseInDetail().id > 0;
  }

  employeeOfId(employeeId: number) {
    return this.employees().find(e => e.id == employeeId);
  }
}