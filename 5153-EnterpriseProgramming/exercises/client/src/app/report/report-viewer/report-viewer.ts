import { Component, signal } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

import { Employee } from '@app/employee/employee';
import { EmployeeDropdown } from '@app/employee/employee-dropdown/employee-dropdown';

import { Report } from '@app/report/report';
import { ReportService } from '@app/report/report-service';

@Component({
  selector: 'app-report-viewer',
  imports: [ReactiveFormsModule, MatCardModule, MatSelectModule, MatOptionModule, EmployeeDropdown],
  templateUrl: './report-viewer.html',
  styleUrl: './report-viewer.scss'
})
export class ReportViewer {

  constructor(protected reportService: ReportService) {
  }

  viewerForm: FormGroup = new FormGroup({
    employeeId: new FormControl(),
  });

  employeeSelected(employee: Employee) {
      this.reportService.getAllById(employee.id).subscribe({
      next: (payload: Report[]) => console.log(payload),
      error: e => console.log(e),
    });
  }
}