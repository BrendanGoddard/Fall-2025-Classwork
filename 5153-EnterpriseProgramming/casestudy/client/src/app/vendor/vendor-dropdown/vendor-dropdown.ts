import { Component, OnInit, signal, output } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule, MatSelectChange } from '@angular/material/select';
import { MatLabel } from '@angular/material/form-field';

import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

import { Vendor } from '@app/vendor/vendor';
import { VendorService } from '@app/vendor/vendor.service';

@Component({
  selector: 'app-vendor-dropdown',
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatLabel,
    MatSelectModule,
    MatOptionModule
  ],
  templateUrl: './vendor-dropdown.html',
  styleUrl: './vendor-dropdown.scss'
})
export class VendorDropdown implements OnInit {

  constructor(protected vendorService: VendorService) {}

  vendors = signal<Vendor[]>([]);
  selected = output<number>();

  formGroup = new FormGroup({
    vendor: new FormControl()
  });

  ngOnInit() {
    this.loadVendors();
  }

  loadVendors() {
    this.vendorService.getAll().subscribe({
      next: (payload: Vendor[]) => this.vendors.set(payload),
      error: e => console.log(e)
    });
  }

  vendorSelected(vendor: Vendor) {
  this.selected.emit(vendor.id); // Strongly typed, no deprecated API
}

}
