import { Component, InputSignal, OnInit, input, output } from '@angular/core';

import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';

import { MatLabel, MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { Employee } from '../employee';
import { EMPLOYEE_DEFAULT } from '../../constants';

import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-employee-details',
  imports: [ReactiveFormsModule, MatLabel, MatFormField, MatInputModule, MatButtonModule],
  templateUrl: './employee-details.html',
  styleUrl: './employee-details.scss'
})
export class EmployeeDetails implements OnInit {

  employee: InputSignal<Employee> = input<Employee>(EMPLOYEE_DEFAULT);

  saved = output<Employee>();
  closed = output<void>();

  employeeForm: FormGroup = new FormGroup({
    id: new FormControl(),
    title: new FormControl(),
    firstName: new FormControl(),
    lastName: new FormControl(),
    phone: new FormControl(),
    email: new FormControl(),
  });

  ngOnInit(): void {
    this.employeeForm.setValue({
      id: this.employee().id,
      title: this.employee().title,
      firstName: this.employee().firstName,
      lastName: this.employee().lastName,
      phone: this.employee().phone,
      email: this.employee().email,
    })
  }
}