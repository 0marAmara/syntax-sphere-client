import {Component, inject} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormFieldComponent} from '../../../shared/form-field/form-field.component';
import {FormGroup, FormsModule, NgForm} from '@angular/forms';
import {ButtonComponent} from '../../../shared/button/button.component';
import {AuthService} from '../../../core/services/auth.service';
import {LoginUser} from '../../../shared/models/user.model';

@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    FormFieldComponent,
    FormsModule,
    ButtonComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  signupForm!: FormGroup;
  errorMessage: string="";

  onSubmit(form: NgForm) {
    this.errorMessage="";
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
