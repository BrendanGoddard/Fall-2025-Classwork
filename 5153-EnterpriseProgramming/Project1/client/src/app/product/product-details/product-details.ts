import { Component, OnInit, input, output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
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
  isNewProduct = input<boolean>(false);
  existingIds = input<string[]>([]); 

  saved = output<Product>();
  deleted = output<string>();
  closed = output<void>();

  productForm: FormGroup = new FormGroup({
    id: new FormControl('', [
      Validators.required,
      (control: AbstractControl): { invalidId: boolean } | null => {
        const enteredId = control.value?.trim();
        if (!enteredId) return null;

        const currentId = this.product().id;
        if (!this.isNewProduct() && enteredId === currentId) return null;

        const isDuplicate = this.existingIds().includes(enteredId);
        return isDuplicate ? { invalidId: true } : null;
      }
    ]),
    vendorId: new FormControl('', Validators.min(1)),
    name: new FormControl('', Validators.min(1)),
    cost: new FormControl(0, Validators.min(0)),
    msrp: new FormControl(0, Validators.min(0)),
    rop: new FormControl(0, Validators.min(0)),
    eoq: new FormControl(0, Validators.min(0)),
    qoh: new FormControl(0, Validators.min(0)),
    qoo: new FormControl(0, Validators.min(0)),
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
