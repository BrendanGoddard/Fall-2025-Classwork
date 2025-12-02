import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelectModule, MatSelectChange } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

import { Vendor } from '@app/vendor/vendor';
import { VendorService } from '@app/vendor/vendor.service';
import { Product } from '@app/product/product';
import { ProductService } from '@app/product/product.service';
import { PurchaseOrder } from '@app/purchase-order/purchase-order';
import { PurchaseOrderLineItem } from '@app/purchase-order/purchase-order-line-item';
import { PurchaseOrderService } from '@app/purchase-order/purchase-order.service';
import { PurchaseOrderTable } from '@app/purchase-order/purchase-order-table/purchase-order-table';
import { PURCHASE_ORDER_DEFAULT } from '@app/constants';

@Component({
  selector: 'app-purchase-order-viewer',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatLabel,
    MatFormField,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    PurchaseOrderTable,
  ],
  templateUrl: './purchase-order-viewer.html',
  styleUrl: './purchase-order-viewer.scss',
})
export class PurchaseOrderViewer implements OnInit {
  constructor(
    protected vendorService: VendorService,
    protected productService: ProductService,
    protected poService: PurchaseOrderService
  ) {}

  vendors = signal<Vendor[]>([]);
  purchaseOrders = signal<PurchaseOrder[]>([]);
  selectedPurchaseOrder = signal<PurchaseOrder>(PURCHASE_ORDER_DEFAULT);
  selectedVendor = signal<Vendor | null>(null);

  productsForVendor = signal<Product[]>([]);
  lineItemsForOrder = signal<PurchaseOrderLineItem[]>([]);

  form: FormGroup = new FormGroup({
    vendorId: new FormControl<number | null>(null),
    purchaseOrderId: new FormControl<number | null>(null),
  });

  ngOnInit(): void {
    this.loadVendors();
  }

  loadVendors(): void {
    this.vendorService.getAll().subscribe({
      next: (payload: Vendor[]) => this.vendors.set(payload),
      error: (e: Error) => console.error(e),
    });
  }

  onVendorChange(selection: MatSelectChange): void {
    const vendorId = selection.value as number;

    this.form.get('purchaseOrderId')?.setValue(null);
    this.selectedPurchaseOrder.set(PURCHASE_ORDER_DEFAULT);
    this.lineItemsForOrder.set([]);

    const vendor = this.vendors().find((v) => v.id === vendorId) || null;
    this.selectedVendor.set(vendor);

    this.poService.getAllByVendorId(vendorId).subscribe({
      next: (payload: PurchaseOrder[]) => this.purchaseOrders.set(payload),
      error: (e: Error) => console.error(e),
    });

    this.productService.getByVendorId(vendorId).subscribe({
      next: (payload: Product[]) => this.productsForVendor.set(payload),
      error: (e: Error) => console.error(e),
    });
  }

  onPurchaseOrderChange(selection: MatSelectChange): void {
    const poId = selection.value as number;
    const po =
      this.purchaseOrders().find((p) => p.id === poId) || PURCHASE_ORDER_DEFAULT;

    this.selectedPurchaseOrder.set(po);
    this.lineItemsForOrder.set(po.items ?? []);
  }

  // ---------- MONEY HELPERS (same logic as generator) ----------

  costOfProduct(productId: string): number {
    const p = this.productsForVendor().find((prod) => prod.id === productId);
    return p ? p.cost : 0;
  }

  private toCents(n: number): number {
    return Math.round((n ?? 0) * 100);
  }

  private fromCents(c: number): number {
    return c / 100;
  }

  subTotal(): number {
    const cents = this.lineItemsForOrder().reduce(
      (sum, li) =>
        sum +
        this.toCents(this.costOfProduct(li.productId)) * li.quantity,
      0
    );
    return this.fromCents(cents);
  }

  tax(): number {
    return this.fromCents(Math.round(this.subTotal() * 100 * 0.13));
  }

  total(): number {
    return this.fromCents(Math.round(this.subTotal() * 100 * 1.13));
  }

  // ---------- PDF VIEW ----------

  viewPDF(): void {
    const po = this.selectedPurchaseOrder();
    if (po.id > 0) {
      window.open(
        `${this.poService.apiURL()}/po/pdf/${po.id}`
      );
    }
  }
}
