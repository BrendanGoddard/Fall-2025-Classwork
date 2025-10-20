import { Component, OnInit, input, output } from '@angular/core';

import { FormControl, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';

import { MatLabel, MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { Expense } from '@app/expense/expense';
import { Employee } from '@app/employee/employee';
import { EXPENSE_DEFAULT } from '@app/constants';

@Component({
  selector: 'app-expense-details',
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule,
    MatSelectModule, MatOptionModule, MatDatepickerModule,
    MatLabel, MatFormField],
  templateUrl: './expense-details.html',
  styleUrl: './expense-details.scss',
})
export class ExpenseDetails implements OnInit {

  // Inputs
  expense = input<Expense>(EXPENSE_DEFAULT);
  employees = input<Employee[]>([]);

  saved = output<Expense>();
  deleted = output<number>();
  closed = output<void>();

  // Forms
  expenseForm: FormGroup = new FormGroup({
    id: new FormControl(),
    employeeId: new FormControl('', Validators.compose([Validators.min(1)])),
    categoryId: new FormControl('', Validators.compose([Validators.required])),
    description: new FormControl('', Validators.compose([Validators.required])),
    date: new FormControl('', Validators.compose([Validators.required])),
    amount: new FormControl('', Validators.compose([Validators.min(1)]))
  });

  ngOnInit(): void {
    this.expenseForm.setValue({
      id: this.expense().id,
      employeeId: this.expense().employeeId,
      categoryId: this.expense().categoryId,
      description: this.expense().description,
      date: this.expense().date,
      amount: this.expense().amount
    })
  }
}