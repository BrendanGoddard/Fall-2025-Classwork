import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

import { PurchaseOrderService } from '@app/purchase-order/purchase-order.service';
import { PurchaseOrder } from '@app/purchase-order/purchase-order';
import { PurchaseOrderLineItem } from '@app/purchase-order/purchase-order-line-item';

import { VendorDropdown } from '@app/vendor/vendor-dropdown/vendor-dropdown';
import { PurchaseOrderDropdown } from '@app/purchase-order/purchase-order-viewer/purchase-order-dropdown';
import { PurchaseOrderTable } from '@app/purchase-order/purchase-order-viewer/purchase-order-table';

import { Vendor } from '@app/vendor/vendor';


@Component({
  selector: 'app-purchase-order-viewer',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    VendorDropdown,
    PurchaseOrderDropdown,
    PurchaseOrderTable,
  ],
  templateUrl: './purchase-order-viewer.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PurchaseOrderViewerComponent {
  private service = inject(PurchaseOrderService);

  readonly vendorId = signal<number>(0);
  readonly purchaseOrder = signal<PurchaseOrder>({ id: 0, vendorId: 0, date: '', items: [] });
  readonly orderItems = signal<PurchaseOrderLineItem[]>([]);

  vendorSelected(id: number) {
  this.vendorId.set(id);
  this.purchaseOrder.set({ id: 0, vendorId: id, date: '', items: [] });
  this.orderItems.set([]);
}


  purchaseOrderSelected(order: PurchaseOrder) {
    this.purchaseOrder.set(order);

    this.service
      .getPurchaseOrderItems(order.id)
      .subscribe(items => this.orderItems.set(items ?? []));
  }
}
