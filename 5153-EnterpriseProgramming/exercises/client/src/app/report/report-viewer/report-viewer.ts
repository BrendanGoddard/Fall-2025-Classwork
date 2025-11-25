import { Component, OnInit, signal } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatLabel, MatFormField } from '@angular/material/form-field';

import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

import { Employee } from '@app/employee/employee';
import { EmployeeService } from '@app/employee/employee.service';

import { Report } from '@app/report/report';
import { ReportService } from '@app/report/report-service';

@Component({
  selector: 'app-report-viewer',
  imports: [ReactiveFormsModule, MatCardModule, MatLabel, MatFormField, MatSelectModule, MatOptionModule],
  templateUrl: './report-viewer.html',
  styleUrl: './report-viewer.scss'
})
export class ReportViewer implements OnInit {

  constructor(protected employeeService: EmployeeService, protected reportService: ReportService) {
  }

  employees = signal<Employee[]>([]);

  viewerForm: FormGroup = new FormGroup({
    employeeId: new FormControl(),
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
    this.reportService.getAllById(selection.value).subscribe({
      next: (payload: Report[]) => console.log(payload),
      error: e => console.log(e),
    });
  }
}