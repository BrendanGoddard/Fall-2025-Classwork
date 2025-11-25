import { Component, OnChanges, signal, input, output } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatLabel } from '@angular/material/form-field';

import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

import { Report } from '../report';
import { ReportService } from '../report-service';

@Component({
  selector: 'app-report-dropdown',
  imports: [MatCardModule, ReactiveFormsModule, MatLabel, MatSelectModule, MatOptionModule],
  templateUrl: './report-dropdown.html',
  styleUrl: './report-dropdown.scss'
})
export class ReportDropdown implements OnChanges {

  constructor(protected reportService: ReportService) { }

  employeeId = input<number>(0);
  reports = signal<Report[]>([]);
  selected = output<Report>();

  formGroup = new FormGroup({
    report: new FormControl()
  });

  ngOnChanges() {
    this.formGroup.reset();
    this.loadReports();
  }

  loadReports() {
    this.reportService.getAllById(this.employeeId()).subscribe({
      next: (payload: Report[]) => this.reports.set(payload),
      error: e => console.log(e)
    });
  }

  reportSelected(selection: MatSelectChange) {
    this.selected.emit(selection.value);
  }
}