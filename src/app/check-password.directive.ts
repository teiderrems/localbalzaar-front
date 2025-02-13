import { Directive } from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';

@Directive({
  selector: '[appCheckPassword]',
  providers: [
    {provide: NG_VALIDATORS, useExisting: CheckPasswordDirective, multi: true},
  ],
})
export class CheckPasswordDirective implements Validators{

  constructor() { }
  validate(control: AbstractControl): ValidationErrors | null {
    return passwordMatchValidator(control);
  }
}


/** An actor's name can't match the actor's role */
export const  passwordMatchValidator:ValidatorFn=(control: AbstractControl):ValidationErrors | null => {
  const password = control.get('password');
  const confirm_password = control.get('confirm_password');
  return password && confirm_password && password.value !== confirm_password.value ? {'mismatch': true} : null;
}
