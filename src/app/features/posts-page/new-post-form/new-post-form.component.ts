import {Component} from '@angular/core';
import {FormFieldComponent} from '../../../shared/form-field/form-field.component';
import {TextAreaFieldComponent} from '../../../shared/text-area-field/text-area-field.component';
import {FormsModule, NgForm} from '@angular/forms';
import {ButtonComponent} from '../../../shared/button/button.component';

@Component({
  selector: 'app-new-post-form',
  imports: [
    FormFieldComponent,
    TextAreaFieldComponent,
    FormsModule,
    ButtonComponent,
  ],
  templateUrl: './new-post-form.component.html',
  styleUrl: './new-post-form.component.scss'
})


export class NewPostFormComponent {
  urlIsEnabled= false;

  onSubmit(newPostForm: NgForm) {
    //TODO do this and happy new year
    console.log(newPostForm.value.url.length);
  }

  toggleUrl(){
    this.urlIsEnabled = !this.urlIsEnabled;
  }
}
