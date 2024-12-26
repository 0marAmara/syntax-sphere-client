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
import {ConfirmPasswordValidator} from './confirm-password.validator';

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
        'confirmPassword': new FormControl('', [Validators.required, Validators.minLength(6), ConfirmPasswordValidator.MatchPassword]),
      }
    )
  }

  formInputError(name: string) {
    return !this.signupForm.get(name)!.valid && this.signupForm.get(name)!.touched;
  }

  onSubmit(): void {
    console.log('Form submitted:', this.signupForm.value);
  }

  getFirstNameErrorMessage() {
    if (this.signupForm.get('firstName')?.hasError('required')) {
      return 'Please enter your first name.';
    } else if (this.signupForm.get('firstName')?.hasError('minlength')) {
      return 'First name must be at least 3 characters long.';
    }
    return '';
  }

  getLastNameErrorMessage() {
    if (this.signupForm.get('lastName')?.hasError('required')) {
      return 'Please enter your last name.';
    } else if (this.signupForm.get('lastName')?.hasError('minlength')) {
      return 'Last name must be at least 3 characters long.';
    }
    return '';
  }

  getUsernameErrorMessage() {
    if (this.signupForm.get('username')?.hasError('required')) {
      return 'Please enter a username.';
    } else if (this.signupForm.get('username')?.hasError('minlength')) {
      return 'Username must be at least 4 characters long.';
    }
    return '';
  }

  getEmailErrorMessage() {
    if (this.signupForm.get('email')?.hasError('required')) {
      return 'Please enter your email address.';
    } else if (this.signupForm.get('email')?.hasError('email')) {
      return 'Please enter a valid email address.';
    }
    return '';
  }

  getPasswordErrorMessage() {
    if (this.signupForm.get('password')?.hasError('required')) {
      return 'Please enter a password.';
    } else if (this.signupForm.get('password')?.hasError('minlength')) {
      return 'Password must be at least 6 characters long.';
    }
    return '';
  }

  getConfirmPasswordErrorMessage() {
    if (this.signupForm.get('confirmPassword')?.hasError('required')) {
      return 'Please confirm your password.';
    } else if (this.signupForm.get('confirmPassword')?.hasError('minlength')) {
      return 'Password confirmation must be at least 6 characters long.';
    } else if (this.signupForm.get('confirmPassword')?.hasError('confirmPassword')) {
      return 'Passwords do not match.';
    }
    return '';
  }
}
