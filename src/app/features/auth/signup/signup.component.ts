import {Component, inject, OnInit} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {ConfirmPasswordValidator} from './confirm-password.validator';
import {ButtonComponent} from '@shared/button/button.component';
import {SignupUser} from '@shared/models/user.model';
import {AuthService} from '@core/services';
import {InputFieldComponent} from '@shared/form/input-field/input-field.component';
import {ERROR_MESSAGES} from '@shared/utility/form-error-messages';

@Component({
  selector: 'app-signup',
  imports: [
    FormsModule,
    RouterLink,
    ReactiveFormsModule,
    ButtonComponent,
    InputFieldComponent
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
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

  get firstNameControl(): FormControl {
    return this.signupForm.controls['firstName'] as FormControl;
  }

  get lastNameControl(): FormControl {
    return this.signupForm.controls['lastName'] as FormControl;
  }

  get usernameControl(): FormControl {
    return this.signupForm.controls['username'] as FormControl;
  }

  get emailControl(): FormControl {
    return this.signupForm.controls['email'] as FormControl;
  }

  get passwordControl(): FormControl {
    return this.signupForm.controls['password'] as FormControl;
  }

  get confirmPasswordControl(): FormControl {
    return this.signupForm.controls['confirmPassword'] as FormControl;
  }

  formInputError(name: string) {
    return !this.signupForm.get(name)!.valid && this.signupForm.get(name)!.touched;
  }

  onSubmit(): void {
    const user: SignupUser = {
      firstName: this.signupForm.value.firstName,
      lastName: this.signupForm.value.lastName,
      username: this.signupForm.value.username,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password
    }
    this.authService.signup(user).subscribe({
      next: (response) => {
        this.router.navigate(['/posts/']);
      },
      error: (error) => {
        this.usernameControl.setErrors({usernameExists: true});
      },
    })
  }

  getErrorMessageRecord(fieldName: string) {
    return ERROR_MESSAGES[fieldName];
  }
}
