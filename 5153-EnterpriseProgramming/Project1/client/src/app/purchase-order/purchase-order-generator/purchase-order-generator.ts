import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatLabel, MatFormField } from '@angular/material/form-field';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';

import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

import { PurchaseOrder } from '@app/purchase-order/purchase-order';
import { PurchaseOrderService } from '@app/purchase-order/purchase-order.service';
import { PurchaseOrderLineItem } from '@app/purchase-order/purchase-order-line-item';

@Component({
  selector: 'app-purchase-order-generator',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatLabel,
    MatFormField,
    MatSelectModule,
    MatOptionModule,
    CommonModule,
    MatTableModule
  ],
  templateUrl: './purchase-order-generator.html',
  styleUrl: './purchase-order-generator.scss'
})
export class PurchaseOrderGenerator implements OnInit {
  constructor(protected purchaseOrderService: PurchaseOrderService) {}

  tableColumns = ['productId', 'quantity', 'cost'];
  purchaseOrderTable = new MatTableDataSource<PurchaseOrderLineItem>();

  purchaseOrderCreatedMessage = signal<string>('');

  vendors = signal<any[]>([]);
  vendorProducts = signal<any[]>([]);

  purchaseOrderForm: FormGroup = new FormGroup({
    vendorId: new FormControl(),
    productId: new FormControl(),
    quantity: new FormControl(1)
  });

  ngOnInit(): void {
    this.loadVendors();
  }

  loadVendors() {
    this.purchaseOrderService.getVendors().subscribe({
      next: (payload: any[]) => this.vendors.set(payload),
      error: (e) => console.error('Error loading vendors:', e)
    });
  }

  onVendorSelectionChange(selection: MatSelectChange) {
  const vendorId = selection.value;

  // Get all products once, filter in Angular
  this.purchaseOrderService.getAllProducts().subscribe({
    next: (products: any[]) => {
      const filtered = products.filter(p => p.vendorId === vendorId);
      this.vendorProducts.set(filtered);
    },
    error: err => console.error('Error loading products:', err)
  });

  // Reset UI
  this.purchaseOrderForm.get('productId')?.setValue('');
  this.purchaseOrderForm.get('quantity')?.setValue(0);
  this.purchaseOrderTable.data = [];
  this.purchaseOrderCreatedMessage.set('');
}

  selectedVendorId() {
    return (this.purchaseOrderForm.get('vendorId')?.value ?? 0) as number;
  }

  selectedProductId() {
    return (this.purchaseOrderForm.get('productId')?.value ?? 0) as string;
  }

  selectedQuantity() {
    return (this.purchaseOrderForm.get('quantity')?.value ?? 0) as number;
  }

  productAlreadyAdded() {
    return (
      this.purchaseOrderTable.data.find(
        (p) => p.productId == this.selectedProductId()
      ) != undefined
    );
  }

  costOfProduct(productId: string) {
    const product =
      this.vendorProducts().find((p) => p.id == productId) ?? { cost: 0 };
    return product.cost;
  }

private getFormattedDate(): string {
  const now = new Date();
  return (
    now.getFullYear() +
    '-' +
    String(now.getMonth() + 1).padStart(2, '0') +
    '-' +
    String(now.getDate()).padStart(2, '0') +
    '@' +
    String(now.getHours()).padStart(2, '0') +
    ':' +
    String(now.getMinutes()).padStart(2, '0') +
    ':' +
    String(now.getSeconds()).padStart(2, '0')
  );
}


  orderSubtotal() {
    let subtotal = 0;
    this.purchaseOrderTable.data.forEach((item) => {
      subtotal += this.costOfProduct(item.productId) * item.quantity;
    });
    return subtotal;
  }

  orderTax() {
    return this.orderSubtotal() * 0.13;
  }

  orderTotal() {
    return this.orderSubtotal() + this.orderTax();
  }

  clearAll() {
  this.purchaseOrderForm.get('vendorId')?.setValue('');
  this.purchaseOrderForm.get('productId')?.setValue('');
  this.purchaseOrderForm.get('quantity')?.setValue(0);

  this.vendorProducts.set([]);
  this.purchaseOrderTable.data = [];

  // this.purchaseOrderCreatedMessage.set('');
}

 updatePurchaseOrder() {
  const productId = this.purchaseOrderForm.get('productId')?.value;
  const quantity = Number(this.purchaseOrderForm.get('quantity')?.value);

  if (!productId) return; // No product selected
  if (quantity < 0) return; // Invalid quantity

  const currentData = this.purchaseOrderTable.data;

  // Check if product already exists in the table
  const existingIndex = currentData.findIndex(item => item.productId === productId);

  if (quantity === 0 && existingIndex !== -1) {
    // Remove product if quantity is zero
    currentData.splice(existingIndex, 1);
  } else if (existingIndex !== -1) {
    // Update existing quantity
    currentData[existingIndex].quantity = quantity;
  } else {
    // Add new product
    currentData.push({ id: 0, poId: 0, productId, quantity });
  }

  // Refresh the table data binding
  this.purchaseOrderTable.data = [...currentData];
}

  
  completePurchaseOrder() {
  const po = {
    id: 0,
    vendorId: this.selectedVendorId(),
    date: this.getFormattedDate(), // ✅ matches backend @JsonFormat
    items: this.purchaseOrderTable.data.map(item => ({
      id: 0,
      poId: 0,
      productId: item.productId,
      quantity: item.quantity
    }))
  };

  console.log("PO being sent:", JSON.stringify(po, null, 2));

  this.purchaseOrderService.post(po).subscribe({
    next: (res: any) => {
      const id = res?.id ?? '(unknown)';
      const ts = this.getFormattedDate();
      this.purchaseOrderCreatedMessage.set(`PO #${id} created at ${ts}`);
      this.clearAll();
    },
    error: (err: any) => {
      console.error('Error creating purchase order:', err);
      alert('Error creating purchase order. Check console for details.');
    }
  });
}


}
