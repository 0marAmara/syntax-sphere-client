import {Component, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {PasswordMatchDirective} from './password-match.directive';
import {RouterLink} from '@angular/router';
import {FormFieldComponent} from '../../../shared/form-field/form-field.component';

@Component({
  selector: 'app-signup',
  imports: [
    FormsModule,
    PasswordMatchDirective,
    RouterLink,
    FormFieldComponent
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  @ViewChild('signupForm') signupForm!: NgForm;

  onSubmit() {
    console.log(this.signupForm);
  }
}
