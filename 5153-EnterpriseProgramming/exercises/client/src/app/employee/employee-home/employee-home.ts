import { Component, OnInit, WritableSignal, signal } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { EmployeeDetails } from '../employee-details/employee-details';
import { EMPLOYEE_DEFAULT } from '../../constants'

@Component({
  selector: 'app-employee-home',
  imports: [MatCardModule, MatListModule, EmployeeDetails, MatIconModule],
  templateUrl: './employee-home.html',
  styleUrl: './employee-home.scss'
})
export class EmployeeHome implements OnInit {

  employees: WritableSignal<Employee[]> = signal<Employee[]>([]);
  employeeInDetail: WritableSignal<Employee> = signal<Employee>(EMPLOYEE_DEFAULT)
  newEmployee = signal<boolean>(false);

  constructor(public employeeService: EmployeeService) {
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.employeeService.getEmployees().subscribe({
      next: (payload: Employee[]) => {
        console.log(payload);
        this.employees.set(payload);
      },
      error: (e: Error) => console.error(e),
      complete: () => this.selectEmployee(EMPLOYEE_DEFAULT)
    });
  }
  selectEmployee(employee: Employee) {
    this.employeeInDetail.set(employee);
    this.newEmployee.set(false);
  }

  hasEmployeeSelected(): boolean {
    return this.employeeInDetail().id > 0 || this.newEmployee();
  }

  addNewEmployee() {
    this.employeeInDetail.set(EMPLOYEE_DEFAULT);
    this.newEmployee.set(true);
  }

    updateEmployee(employee: Employee) {
    this.employeeService.updateEmployee(employee).subscribe({
      next: (payload: Employee) => {
        console.log(payload);
        this.employeeInDetail.set(payload);
      },
      error: (e: Error) => console.error(e),
      complete: () => this.refresh()
    });
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe({
      next: (payload: number) => console.log(`${payload} deleted`),
      error: (e: Error) => console.error(e),
      complete: () => this.refresh()
    });
  }

  createEmployee(employee: Employee) {
    this.employeeService.createEmployee(employee).subscribe({
      next: (payload: Employee) => console.log(payload),
      error: (e: Error) => console.error(e),
      complete: () => this.refresh()
    });
  }

  saveEmployee(employee: Employee) {
    this.newEmployee() ? this.createEmployee(employee) : this.updateEmployee(employee);
  }
}