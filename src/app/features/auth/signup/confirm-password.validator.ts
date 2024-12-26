import {AbstractControl} from '@angular/forms';

export class ConfirmPasswordValidator{
  static MatchPassword(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.parent?.get('password')?.value;
    const confirmPassword = control.parent?.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return { confirmPassword: true };
    } else {
      return null;
    }
  }
}
