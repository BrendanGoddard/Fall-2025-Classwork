import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PRODUCT_DEFAULT } from '@app/constants';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-product-details',
  standalone: true,
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.scss'],
  imports: [
    CommonModule,            // ✅ Fixes ngIf / ngFor errors
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    MatFormFieldModule,
    MatExpansionModule
  ],
})
export class ProductDetails implements OnChanges {
  @Input() product = PRODUCT_DEFAULT;
  @Input() vendors: any[] = [];
  @Output() saved = new EventEmitter<any>();
  @Output() deleted = new EventEmitter<any>();
  @Output() closed = new EventEmitter<void>();

  productForm!: FormGroup;
  newProduct = false;

  constructor(private fb: FormBuilder) {}

  ngOnChanges(): void {
    this.newProduct = this.product.id === PRODUCT_DEFAULT.id;
    this.productForm = this.fb.group({
      id: [this.product.id, Validators.required],
      vendorId: [this.product.vendorId, Validators.required],
      name: [this.product.name, Validators.required],
      cost: [this.product.cost, [Validators.required, Validators.min(0)]],
      msrp: [this.product.msrp, [Validators.required, Validators.min(0)]],
      rop: [this.product.rop, [Validators.required, Validators.min(0)]],
      eoq: [this.product.eoq, [Validators.required, Validators.min(0)]],
      qoh: [this.product.qoh, [Validators.required, Validators.min(0)]],
      qoo: [this.product.qoo, [Validators.required, Validators.min(0)]],
    });
  }

  productFormValue() {
    return this.productForm.value;
  }
}
