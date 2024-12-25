import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';
import {Directive, Input} from '@angular/core';

@Directive({
  selector: '[passwordMatch]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordMatchDirective,
      multi: true
    }
  ]
})

export class PasswordMatchDirective implements Validator {
  @Input('passwordMatch') passwordField!: string;

  validate(control: AbstractControl): ValidationErrors | null {
    const form = control.parent;
    if (!form)
      return null;

    const password = form.get(this.passwordField)?.value;
    const confirmPassword = control.value;

    if (password !== confirmPassword) {
      return {passwordMatch: true};
    }

    return null;
  }
}
