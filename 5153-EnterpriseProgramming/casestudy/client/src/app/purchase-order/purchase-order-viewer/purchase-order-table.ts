import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';

import { PurchaseOrderLineItem } from '@app/purchase-order/purchase-order-line-item';

@Component({
  selector: 'app-purchase-order-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSortModule],
  templateUrl: './purchase-order-table.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PurchaseOrderTable implements OnChanges {
  @Input() items: PurchaseOrderLineItem[] = [];

  readonly columns = ['poId', 'quantity', 'unitCost', 'extended'];

  tableSource = new MatTableDataSource<PurchaseOrderLineItem>();

  @ViewChild(MatSort) sort!: MatSort;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items']) {
      this.tableSource.data = this.items ?? [];
    }
  }

  extended(item: PurchaseOrderLineItem) {
  return item.quantity * this.costOfProduct(item.productId);
}


  subtotal() {
    return this.items.reduce((sum, i) => sum + this.extended(i), 0);
  }

  tax() {
    return this.subtotal() * 0.13;
  }

  total() {
    return this.subtotal() + this.tax();
  }

  @Input() products: any[] = []; // vendorProducts or all products

    costOfProduct(productId: string): number {
    const p = this.products.find(p => p.id == productId);
    return p?.cost ?? 0;
    }

}
