import { Routes } from '@angular/router';
import { Home } from '../app/home/home';
import { VendorHome } from './vendor/vendor-home/vendor-home';
import { ProductHome } from './product/product-home/product-home';
import { PurchaseOrderGenerator } from '@app/purchase-order/purchase-order-generator/purchase-order-generator';

export const routes: Routes = [
  { path: '', component: Home, },

  { path: 'vendors', component: VendorHome, },
  { path: 'products', component: ProductHome},
  { path: 'purchase-order', component: PurchaseOrderGenerator}
];