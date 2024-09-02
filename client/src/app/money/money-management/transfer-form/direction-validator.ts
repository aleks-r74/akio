import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const directionValidator: ValidatorFn = (formGroupControl: AbstractControl<any, any>) => {
  let formValue = formGroupControl.value;
  const errors: ValidationErrors = {};
  if (formValue.dest === formValue.source) {
   return { error: true, message: 'Source and Dest can not be the same' };
  }
  if (formValue.dest === 'To' || formValue.source === 'From') {
    return { error: true, message: 'Select destination' };
  }

  return null;
};