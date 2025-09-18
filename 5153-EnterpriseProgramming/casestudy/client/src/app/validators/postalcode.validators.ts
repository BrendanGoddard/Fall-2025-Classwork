import { AbstractControl } from '@angular/forms';

export function ValidatePostalCode(control: AbstractControl): { invalidCode: boolean } | null {
  // Canadian postal code format: A1A 1A1 or A1A1A1
  const POSTALCODE_REGEXP = /^[A-Za-z]\d[A-Za-z][ ]?\d[A-Za-z]\d$/;

  return control.value && !POSTALCODE_REGEXP.test(control.value)
    ? { invalidCode: true }
    : null;
}
