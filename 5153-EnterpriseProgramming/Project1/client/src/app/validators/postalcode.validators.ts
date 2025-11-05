import { AbstractControl } from '@angular/forms';

export function ValidatePostalCode(control: AbstractControl): { invalidCode: boolean } | null {
  const POSTALCODE_REGEXP = /^[A-Za-z]\d[A-Za-z][ ]?\d[A-Za-z]\d$/;

  return control.value && !POSTALCODE_REGEXP.test(control.value)
    ? { invalidCode: true }
    : null;
}
