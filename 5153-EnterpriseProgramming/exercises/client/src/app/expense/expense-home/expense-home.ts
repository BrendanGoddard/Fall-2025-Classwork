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
  expenseInDetail = signal<Expense>(EXPENSE_DEFAULT);
  newExpense = signal<boolean>(false);
  expensesTable = new MatTableDataSource<Expense>();
  employees = signal<Employee[]>([]);

  ngOnInit(): void {
    this.refresh();
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

  refresh() {
    this.loadExpenses();
    this.loadEmployees();
    this.expenseInDetail.set(EXPENSE_DEFAULT);
    this.newExpense.set(false);
  }

  selectExpense(expense: Expense) {
    this.expenseInDetail.set(expense);
    this.newExpense.set(false);
  }

  hasSelectedExpense() {
    return this.expenseInDetail().id > 0 || this.newExpense();
  }

  employeeOfId(employeeId: number) {
    return this.employees().find(e => e.id == employeeId);
  }

  addNewExpense() {
    this.expenseInDetail.set(EXPENSE_DEFAULT);
    this.newExpense.set(true);
  }

  saveExpense(expense: Expense) {
    this.newExpense() ? this.createExpense(expense) : this.updateExpense(expense);
  }

  updateExpense(expense: Expense) {
    this.expenseService.update(expense).subscribe({
      next: (payload: Expense) => console.log(payload),
      error: (e: Error) => console.error(e),
      complete: () => this.refresh()
    });
  }

  createExpense(expense: Expense) {
    this.expenseService.create(expense).subscribe({
      next: (payload: Expense) => console.log(payload),
      error: (e: Error) => console.error(e),
      complete: () => this.refresh()
    });
  }

  deleteExpense(id: number) {
    this.expenseService.delete(id).subscribe({
      next: (payload: number) => console.log(`${payload} deleted`),
      error: (e: Error) => console.error(e),
      complete: () => this.refresh()
    });
  }
}