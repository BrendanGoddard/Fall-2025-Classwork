import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Vendor } from '@app/vendor/vendor';
import { VendorService } from '@app/vendor/vendor.service';

import { Product } from '@app/product/product';
import { ProductService } from '@app/product/product.service';
import { PRODUCT_DEFAULT } from '@app/constants';
import { ProductDetails } from '@app/product/product-details/product-details';

@Component({
  selector: 'app-product-home',
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    ProductDetails
  ],
  templateUrl: './product-home.html',
  styleUrl: './product-home.scss'
})
export class ProductHome implements OnInit {
  constructor(
    public productService: ProductService,
    public vendorService: VendorService
  ) {}

  tableColumns: string[] = ['id', 'name', 'vendor'];
  productsTable = new MatTableDataSource<Product>();

  vendors = signal<Vendor[]>([]);
  productInDetail = signal<Product | null>(null);
  newProduct = signal<boolean>(false);

  // Load everything on start
  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.loadProducts();
    this.loadVendors();
  }

  loadProducts() {
    this.productService.getAll().subscribe({
      next: (payload: Product[]) => (this.productsTable.data = payload),
      error: (e) => console.error('Failed to load products:', e),
    });
  }

  loadVendors() {
    this.vendorService.getAll().subscribe({
      next: (payload: Vendor[]) => this.vendors.set(payload),
      error: (e) => console.error('Failed to load vendors:', e),
    });
  }

  vendorName(vendorId: number) {
    return this.vendors().find((v) => v.id === vendorId)?.name ?? 'N/A';
  }

  // When you click a product row
  addNew() {
  this.productInDetail.set({ ...PRODUCT_DEFAULT });
  this.newProduct.set(true);
}

  selectProduct(p: Product) {
    this.productInDetail.set(p);
    this.newProduct.set(false);
  }

  productIds() : String[] {
    return this.productsTable.data.map(product => product.id);
  }

  // Determines which view to show
  hasSelected(): boolean {
    const p = this.productInDetail();
    return p != null && p.id !== '';
  }

  // Called when the Save button is pressed
  save(p: Product) {
    if (this.newProduct()) {
      this.productService.create(p).subscribe({
        next: () => this.afterSave(),
        error: (err) => console.error('Create failed:', err),
      });
    } else {
      this.productService.update(p).subscribe({
        next: () => this.afterSave(),
        error: (err) => console.error('Update failed:', err),
      });
    }
  }

  // Unified post-save logic
  afterSave() {
    this.productInDetail.set(null);
    this.newProduct.set(false);
    this.loadProducts();
  }

  // Delete button
  delete(id: string) {
    this.productService.delete(id).subscribe({
      next: () => this.afterSave(),
      error: (err) => console.error('Delete failed:', err),
    });
  }

  // Close button from details view
  closeDetails() {
    this.productInDetail.set(null);
    this.newProduct.set(false);
    this.loadProducts();
  }
}
