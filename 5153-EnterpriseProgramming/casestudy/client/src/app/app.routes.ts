import { Routes } from '@angular/router';
import { Home } from '../app/home/home';
import { VendorHome } from './vendor/vendor-home/vendor-home';

export const routes: Routes = [
  { path: '', component: Home, },

  // TODO: Replace Home for EmployeeHome component once its created
  { path: 'vendors', component: VendorHome, },
];