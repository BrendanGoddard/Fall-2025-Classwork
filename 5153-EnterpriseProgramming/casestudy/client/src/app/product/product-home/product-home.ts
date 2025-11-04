import { Component, OnInit, AfterViewInit, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';

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
    MatSortModule,
    ProductDetails
  ],
  templateUrl: './product-home.html',
  styleUrl: './product-home.scss'
})
export class ProductHome implements OnInit, AfterViewInit {
  constructor(
    public productService: ProductService,
    public vendorService: VendorService
  ) {}

  @ViewChild(MatSort) sort!: MatSort;
  tableColumns: string[] = ['id', 'name', 'vendor'];
  productsTable = new MatTableDataSource<Product>();

  vendors = signal<Vendor[]>([]);
  productInDetail = signal<Product | null>(null);
  newProduct = signal<boolean>(false);

  ngOnInit(): void {
    this.refresh();
  }

  ngAfterViewInit(): void {
    // Connect sorting after the view initializes
    this.productsTable.sort = this.sort;
  }

  refresh() {
    this.loadProducts();
    this.loadVendors();
  }

  loadProducts() {
    this.productService.getAll().subscribe({
      next: (payload: Product[]) => {
        this.productsTable.data = payload;
        // ensure sorting is initialized after reload
        if (this.sort) this.productsTable.sort = this.sort;
      },
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

  addNew() {
    this.productInDetail.set({ ...PRODUCT_DEFAULT });
    this.newProduct.set(true);
  }

  selectProduct(p: Product) {
    this.productInDetail.set(p);
    this.newProduct.set(false);
  }

  productIds(): string[] {
    return this.productsTable.data.map((product) => product.id);
  }

  hasSelected(): boolean {
    const p = this.productInDetail();
    return p != null && p.id !== '';
  }

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

  afterSave() {
    this.productInDetail.set(null);
    this.newProduct.set(false);
    this.loadProducts();
  }

  delete(id: string) {
    this.productService.delete(id).subscribe({
      next: () => this.afterSave(),
      error: (err) => console.error('Delete failed:', err),
    });
  }

  closeDetails() {
    this.productInDetail.set(null);
    this.newProduct.set(false);
    this.loadProducts();
  }

  // 🔽 Manual sorting function (optional if MatSort auto-sort is preferred)
  sortData(sort: Sort) {
    const data = this.productsTable.data.slice();
    if (!sort.active || sort.direction === '') {
      this.productsTable.data = data;
      return;
    }

    this.productsTable.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return this.compare(a.id, b.id, isAsc);
        default:
          return 0;
      }
    });
  }

  private compare(a: string, b: string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
