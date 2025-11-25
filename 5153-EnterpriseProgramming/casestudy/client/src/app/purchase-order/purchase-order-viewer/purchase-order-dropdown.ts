import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  output,
  inject,
  signal,
} from '@angular/core';

import { PurchaseOrder } from '@app/purchase-order/purchase-order';
import { PurchaseOrderService } from '@app/purchase-order/purchase-order.service';

import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule, MatSelectChange } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatCardTitle } from "@angular/material/card";

@Component({
  selector: 'app-purchase-order-dropdown',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardTitle
],
  templateUrl: './purchase-order-dropdown.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PurchaseOrderDropdown implements OnChanges {
  private fb = inject(FormBuilder);
  private service = inject(PurchaseOrderService);

  @Input() vendorId: number = 0;

  readonly purchaseOrders = signal<PurchaseOrder[]>([]);
  readonly selected = output<PurchaseOrder>();

  formGroup = this.fb.group({
    purchaseOrder: [null],
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['vendorId'] && this.vendorId > 0) {
      this.loadOrders(this.vendorId);
    }
  }

  private loadOrders(vendorId: number) {
    this.formGroup.reset();
    this.purchaseOrders.set([]);

    this.service
      .getAllById(vendorId)
      .subscribe(orders => this.purchaseOrders.set(orders ?? []));
  }

  selectedOrder(event: MatSelectChange) {
    this.selected.emit(event.value);
  }
}
