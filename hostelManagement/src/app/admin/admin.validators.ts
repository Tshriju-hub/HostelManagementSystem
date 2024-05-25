import { AbstractControl, ValidatorFn } from '@angular/forms';

export function negativeValueValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const isNegative = control.value < 0;
    return isNegative ? { 'negativeValue': { value: control.value } } : null;
  };
}
