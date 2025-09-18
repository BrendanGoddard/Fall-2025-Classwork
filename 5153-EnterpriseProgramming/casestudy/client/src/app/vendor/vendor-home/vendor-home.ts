import { Component, OnInit, signal, WritableSignal } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

import { Vendor } from '../vendor';
import { VendorService } from '../vendor.service';
import { VendorDetails } from '../vendor-details/vendor-details';
import { VENDOR_DEFAULT } from '../../constants'

@Component({
  selector: 'app-vendor-home',
  imports: [MatCardModule, MatListModule, VendorDetails],
  templateUrl: './vendor-home.html',
  styleUrl: './vendor-home.scss'
})
export class VendorHome implements OnInit {

  vendors: WritableSignal<Vendor[]> = signal<Vendor[]>([]);
  vendorInDetail: WritableSignal<Vendor> = signal<Vendor>(VENDOR_DEFAULT);

  constructor(public vendorService: VendorService) {
  }

  ngOnInit(): void {
      this.refresh();
  }

  refresh(): void {
    this.vendorService.getVendors().subscribe({
      next: (payload: Vendor[]) => {
        console.log(payload);
        this.vendors.set(payload);
      },
      error: (e: Error) => console.error(e),
      complete: () => this.selectVendor(VENDOR_DEFAULT)
    });
  }

  selectVendor(vendor: Vendor) {
    this.vendorInDetail.set(vendor);
  }

  hasVendorSelected(): boolean {
    return this.vendorInDetail().id > 0;
  }

  updateVendor(vendor: Vendor) {
    this.vendorService.updateVendor(vendor).subscribe({
      next: (payload: Vendor) => {
        console.log(payload);
        this.vendorInDetail.set(payload);
      },
      error: (e: Error) => console.error(e),
      complete: () => this.refresh()
    });
  }
}