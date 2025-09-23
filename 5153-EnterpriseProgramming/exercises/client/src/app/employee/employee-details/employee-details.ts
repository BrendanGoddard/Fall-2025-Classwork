import { Component, InputSignal, OnInit, input, output } from '@angular/core';

import { FormControl, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';

import { MatLabel, MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { Employee } from '@app/employee/employee';
import { EMPLOYEE_DEFAULT } from '@app/constants';

import { MatButtonModule } from '@angular/material/button';

import { ValidatePhone } from '@app/validators/phone.validator';

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
  deleted = output<number>();


  employeeForm: FormGroup = new FormGroup({
    id: new FormControl(),
    title: new FormControl('', Validators.compose([Validators.required])),
    firstName: new FormControl('', Validators.compose([Validators.required])),
    lastName: new FormControl('', Validators.compose([Validators.required])),
    phone: new FormControl('', Validators.compose([Validators.required, ValidatePhone])),
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
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