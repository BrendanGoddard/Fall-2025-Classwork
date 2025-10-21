import { Component, OnInit, signal } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';

import { Vendor } from '@app/vendor/vendor';
import { VendorService } from '@app/vendor/vendor.service';

import { Product } from '@app/product/product';
import { ProductService } from '@app/product/product.service';
import { PRODUCT_DEFAULT } from '@app/constants';
import { ProductDetails } from '@app/product/product-details/product-details'

@Component({
  selector: 'app-expense-home',
  imports: [CommonModule, MatCardModule, MatTableModule, MatIconModule, ProductDetails],
  templateUrl: './product-home.html',
  styleUrl: './product-home.scss'
})
export class ProductHome implements OnInit {
  constructor(public productService: ProductService, public vendorService: VendorService) {
  }

  tableColumns: string[] = ['id', 'name', 'vendor']; // Defines column order

  // Data
  productInDetail = signal<Product>(PRODUCT_DEFAULT);
  newProduct = signal<boolean>(false);
  productsTable = new MatTableDataSource<Product>();
  vendors = signal<Vendor[]>([]);

  ngOnInit(): void {
    this.refresh();
  }

  loadProducts() {
    this.productService.getAll().subscribe({
      next: (payload: Product[]) => {
        this.productsTable.data = payload; // Add the array to the table
      },
      error: e => console.log(e)
    });
  }

  loadVendors() {
    this.vendorService.getAll().subscribe({
      next: (payload: Vendor[]) => this.vendors.set(payload),
      error: e => console.log(e)
    });
  }

  refresh() {
  this.loadProducts();
  this.loadVendors();
  this.productInDetail.set(null as any); // <-- show list first
  this.newProduct.set(false);
}


  selectProduct(product: Product) {
    this.productInDetail.set(product);
    this.newProduct.set(false);
  }

  hasSelectedProduct() {
  const product = this.productInDetail();
  return product && product.id !== 'PR_0' || this.newProduct();
}


  VendorOfId(vendorId: number) {
  // Backend sends vendorId, but your vendors likely have .vendorID or .id
  const vendor = this.vendors().find(
    (v) => v.id === vendorId || v.id === vendorId
  );
  return vendor ? vendor.name : 'N/A';
}


  addNewProduct() {
    this.productInDetail.set(PRODUCT_DEFAULT);
    this.newProduct.set(true);
  }

  saveProduct(product: Product) {
    this.newProduct() ? this.createProduct(product) : this.updateProduct(product);
  }

  updateProduct(product: Product) {
    this.productService.update(product).subscribe({
      next: (payload: Product) => console.log(payload),
      error: (e: Error) => console.error(e),
      complete: () => this.refresh()
    });
  }

  createProduct(product: Product) {
    this.productService.create(product).subscribe({
      next: (payload: Product) => console.log(payload),
      error: (e: Error) => console.error(e),
      complete: () => this.refresh()
    });
  }

  deleteProduct(id: string) {
    this.productService.delete(id).subscribe({
      next: (payload: number) => console.log(`${payload} deleted`),
      error: (e: Error) => console.error(e),
      complete: () => this.refresh()
    });
  }
}