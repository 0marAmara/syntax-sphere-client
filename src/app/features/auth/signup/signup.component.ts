import {Component, OnInit, ViewChild} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {PasswordMatchDirective} from './password-match.directive';
import {RouterLink} from '@angular/router';
import {FormFieldComponent} from '../../../shared/form-field/form-field.component';

@Component({
  selector: 'app-signup',
  imports: [
    FormsModule,
    RouterLink,
    FormFieldComponent,
    ReactiveFormsModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  ngOnInit() {
    this.signupForm = new FormGroup({
        'firstName': new FormControl('', [Validators.required, Validators.minLength(3)]),
        'lastName': new FormControl('', [Validators.required, Validators.minLength(3)]),
        'username': new FormControl('', [Validators.required, Validators.minLength(4)]),
        'email': new FormControl('', [Validators.required, Validators.email]),
        'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
        'confirmPassword': new FormControl('', [Validators.required, Validators.minLength(6)]),
      }, {
        validators: this.passwordMatchValidator
      }
    )
  }

  formInputError(name: string) {
    return !this.signupForm.get(name)!.valid && this.signupForm.get(name)!.touched;
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const group = control as FormGroup;
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : {mismatch: true};
  }

  onSubmit(): void {
    console.log('Form submitted:', this.signupForm.value);

  }
}
