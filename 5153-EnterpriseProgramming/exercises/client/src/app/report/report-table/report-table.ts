import { Component, input, OnChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { CurrencyPipe } from '@angular/common';
import { Expense } from '@app/expense/expense';

@Component({
  selector: 'app-report-table',
  imports: [MatCardModule, MatTableModule, CurrencyPipe],
  templateUrl: './report-table.html',
  styleUrl: './report-table.scss'
})
export class ReportTable implements OnChanges {

  tableColumns = ['date', 'description', 'amount'];
  reportTable = new MatTableDataSource<Expense>();
  expenses = input<Expense[]>([]);

  ngOnChanges(): void {
    this.reportTable.data = this.expenses();
  }

  reportTotal() {
    let total = 0;
    this.reportTable.data.forEach(expense => total += expense.amount);
    return total;
  }
}