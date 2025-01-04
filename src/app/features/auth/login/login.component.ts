import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormFieldComponent} from '../../../shared/form-field/form-field.component';
import {FormControl, FormGroup, FormsModule, NgForm, Validators} from '@angular/forms';
import {ButtonComponent} from '../../../shared/button/button.component';
import {AuthService} from '../../../core/services/auth.service';
import {LoginUser} from '../../../shared/models/user.model';
import {InputFieldComponent} from '../../../shared/form/input-field/input-field.component';

@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    FormsModule,
    ButtonComponent,
    InputFieldComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  loginForm!: FormGroup;
  errorMessage: string = "";

  ngOnInit() {
    this.loginForm = new FormGroup({
      'username': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required]),
    })
  }

  get usernameControl(): FormControl {
    return this.loginForm.get('username') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  onSubmit(form: NgForm) {
    this.errorMessage = "";
    const user: LoginUser = {
      username: form.value.username,
      password: form.value.password,
    }
    this.authService.login(user).subscribe({
      next: (res) => {
        this.router.navigate(['/posts']);
      },
      error: err => {
        this.errorMessage = err.error.error;
      }
    })
  }
}
