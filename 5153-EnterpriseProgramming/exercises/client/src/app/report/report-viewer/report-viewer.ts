import { Component, signal } from '@angular/core';

import { MatCardModule } from '@angular/material/card';

import { Employee } from '@app/employee/employee';
import { EmployeeDropdown } from '@app/employee/employee-dropdown/employee-dropdown';

import { Report } from '../report';
import { ReportItem } from '../report-item';
import { ReportDropdown } from '../report-dropdown/report-dropdown';

import { REPORT_DEFAULT } from '@app/constants';

@Component({
  selector: 'app-report-viewer',
  imports: [MatCardModule, EmployeeDropdown, ReportDropdown],
  templateUrl: './report-viewer.html',
  styleUrl: './report-viewer.scss'
})
export class ReportViewer {

  constructor() {
  }

  employeeId = signal<number>(0);
  report = signal<Report>(REPORT_DEFAULT);

  employeeSelected(employee: Employee) {
    this.employeeId.set(employee.id);
    this.report.set(REPORT_DEFAULT);
  }

  reportSelected(report: Report) {
    console.log(report);
    this.report.set(report);
  }
}