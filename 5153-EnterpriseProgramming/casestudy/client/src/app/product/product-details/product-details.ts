import { Component, OnInit, input, output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatLabel, MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule, MatAccordion } from '@angular/material/expansion';

import { Product } from '@app/product/product';
import { Vendor } from '@app/vendor/vendor';
import { PRODUCT_DEFAULT } from '@app/constants';

@Component({
  selector: 'app-product-details',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    MatExpansionModule,
    MatAccordion,
    MatLabel,
    MatFormField
  ],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails implements OnInit {
  product = input<Product>(PRODUCT_DEFAULT);
  vendors = input<Vendor[]>([]);
  isNewProduct = input<boolean>(false); // 👈 ADD THIS LINE

  saved = output<Product>();
  deleted = output<string>();
  closed = output<void>();


  productForm: FormGroup = new FormGroup({
    id: new FormControl('', Validators.required),
    vendorId: new FormControl('', Validators.min(1)),
    name: new FormControl('', Validators.required),
    cost: new FormControl(0, Validators.required),
    msrp: new FormControl(0, Validators.required),
    rop: new FormControl(0, Validators.required),
    eoq: new FormControl(0, Validators.required),
    qoh: new FormControl(0, Validators.required),
    qoo: new FormControl(0, Validators.required),
  });

  ngOnInit(): void {
    const p = this.product();

    this.productForm.setValue({
      id: p.id,
      vendorId: p.vendorId,
      name: p.name,
      cost: p.cost,
      msrp: p.msrp,
      rop: p.rop,
      eoq: p.eoq,
      qoh: p.qoh,
      qoo: p.qoo,
    });
  }
}
