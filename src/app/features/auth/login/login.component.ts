import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {FormFieldComponent} from '../../../shared/form-field/form-field.component';
import {FormsModule, NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    FormFieldComponent,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  protected readonly onsubmit = onsubmit;

  onSubmit(form: NgForm) {
    console.log(form);
  }
}
