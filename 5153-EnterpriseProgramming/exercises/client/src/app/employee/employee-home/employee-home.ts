import { Component, OnInit, signal } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-home',
  imports: [MatCardModule, MatListModule],
  templateUrl: './employee-home.html',
  styleUrl: './employee-home.scss'
})
export class EmployeeHome implements OnInit {

  employees = signal<Employee[]>([]);

  constructor(public employeeService: EmployeeService) {
  }

  ngOnInit(): void {
    this.employeeService.get().subscribe({
      next: (payload: any) => {
        console.log(payload);
        this.employees.set(payload._embedded.employees)
      },
      error: (e: Error) => console.error(e),
      complete: () => console.log('Complete!')
    });
  }
}