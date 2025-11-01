import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpApiService } from '@app/http-api.service';
import { Report } from '@app/report/report';

@Injectable({
  providedIn: 'root'
})
export class ReportService extends HttpApiService<Report> {
  constructor(http: HttpClient) {
    super(http, 'reports');
  }
}