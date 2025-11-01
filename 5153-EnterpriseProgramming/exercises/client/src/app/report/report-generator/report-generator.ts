import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatLabel, MatFormField } from '@angular/material/form-field';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';

import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

import { Report } from '@app/report/report';
import { ReportService } from '@app/report/report-service';

import { Employee } from '@app/employee/employee';
import { EmployeeService } from '@app/employee/employee.service';

import { Expense } from '@app/expense/expense';
import { ExpenseService } from '@app/expense/expense.service';
@Component({
  selector: 'app-report-generator',
  imports: [ReactiveFormsModule, MatCardModule, MatInputModule, MatButtonModule,
    MatLabel, MatFormField, MatSelectModule, MatOptionModule,CommonModule, MatTableModule
  ],
  templateUrl: './report-generator.html',
  styleUrl: './report-generator.scss'
})
export class ReportGenerator implements OnInit {
  constructor(
    protected employeeService: EmployeeService,
    protected expenseService: ExpenseService,
    protected reportService: ReportService
  ) {}

  tableColumns = ['date', 'description', 'amount'];
  reportTable = new MatTableDataSource<Expense>();

  reportCreatedMessage = signal<String>('');


  employees = signal<Employee[]>([]);
  employeeExpenses = signal<Expense[]>([]);


  reportForm: FormGroup = new FormGroup({
    employeeId: new FormControl(),
    expenseId: new FormControl(),

  });

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getAll().subscribe({
      next: (payload: Employee[]) => this.employees.set(payload),
      error: e => console.log(e)
    });
  }

  onEmployeeSelectionChange(selection: MatSelectChange) {
    this.expenseService.getAllById(selection.value).subscribe({
      next: (payload: Expense[]) => this.employeeExpenses.set(payload),
      error: e => console.log(e),
    });

	// Once we select a new employee, we want to "reset" the component
    
    this.reportForm.get('expenseId')?.setValue(0); // Unselect the expense
    this.reportTable.data = []; // Clear the table
    this.employeeExpenses.set([]); // Clear the list of employee expenses
    this.reportCreatedMessage.set(''); // Clear the report created message
  }
  selectedEmployeeId() {
    return (this.reportForm.get('employeeId')?.value ?? 0) as number;
  }

  selectedExpenseId() {
    return (this.reportForm.get('expenseId')?.value ?? 0) as number;
  }

  expenseAlreadyAdded() {
    return this.reportTable.data.find(expense => expense.id == this.selectedExpenseId()) != undefined;
  }

  reportTotal() {
    let total = 0;
    this.reportTable.data.forEach(expense => total += expense.amount);
    return total;
  }

  addExpense() {
    let expense = this.employeeExpenses().find(expense => expense.id == this.selectedExpenseId())
    if (expense) {
      this.reportTable.data.push(expense);
    }

    this.reportTable.data = this.reportTable.data; // Needs assignment to trigger the re-render
  }

  removeExpense() {
    this.reportTable.data = this.reportTable.data.filter(expense => expense.id != this.selectedExpenseId());
  }

  saveReport() {
    let report: Report = {
      id: 0,
      employeeId: this.selectedEmployeeId(),
      items: [],
      date: ''
    };

    this.reportTable.data.forEach(expense => {
      report.items.push({
        id: 0,
        reportId: 0,
        expenseId: expense.id
      })
    })

    this.reportService.create(report).subscribe({
      next: (payload: Report) => {
        
        // Once the Report is created, we want to "reset" the component and display the created message
        
        this.reportForm.get('employeeId')?.setValue(0);
        this.reportForm.get('expenseId')?.setValue(0);
        this.reportTable.data = [];
        this.employeeExpenses.set([]);
        
        this.reportCreatedMessage.set(`Report #${payload.id} created at ${payload.date}`);
      },
      error: e => console.log(e)
    });
  }
}
