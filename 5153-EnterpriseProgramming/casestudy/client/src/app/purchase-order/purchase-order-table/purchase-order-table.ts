import { Component, Input, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '@app/product/product';
import { PurchaseOrderLineItem } from '@app/purchase-order/purchase-order-line-item';

@Component({
  selector: 'app-purchase-order-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './purchase-order-table.html',
  styleUrls: ['./purchase-order-table.scss']
})
export class PurchaseOrderTable {

  private _products = signal<Product[]>([]);
  private _lineItems = signal<PurchaseOrderLineItem[]>([]);

  @Input() set purchaseOrderProducts(value: Product[]) {
    this._products.set(value ?? []);
  }

  @Input() set purchaseOrderLineItems(value: PurchaseOrderLineItem[]) {
    this._lineItems.set(value ?? []);
  }

  // Build a map for fast lookup
  productMap = computed(() => {
    const map = new Map<string | number, Product>();
    this._products().forEach(p => map.set(p.id, p));
    return map;
  });

  // Build table rows
  rows = computed(() => {
    return this._lineItems().map(li => {
      const product = this.productMap().get(li.productId);
      const price = product?.msrp ?? 0;

      return {
        name: product?.name ?? 'Unknown Product',
        quantity: li.quantity,
        price: price,
        extended: price * li.quantity
      };
    });
  });
}
