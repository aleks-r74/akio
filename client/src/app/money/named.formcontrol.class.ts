import { FormControl, ValidatorFn, AsyncValidatorFn } from '@angular/forms';

export class NamedFormControl<T=any> extends FormControl {
  name?: string="not set";

  constructor(
    initialValue: T,
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null,
  ) {
    super(initialValue, validatorOrOpts, asyncValidator);
  }

  setName(name:string): this{
    this.name = name;
    return this;
  }

  getName(): string|undefined{
    return this.name;
  }
}
