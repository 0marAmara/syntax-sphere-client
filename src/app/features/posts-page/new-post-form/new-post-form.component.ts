import {Component, OnInit} from '@angular/core';
import {TextAreaFieldComponent} from '../../../shared/form/text-area-field/text-area-field.component';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ButtonComponent} from '../../../shared/button/button.component';
import {InputFieldComponent} from '../../../shared/form/input-field/input-field.component';

@Component({
  selector: 'app-new-post-form',
  imports: [
    TextAreaFieldComponent,
    FormsModule,
    ButtonComponent,
    InputFieldComponent,
    ReactiveFormsModule,
    TextAreaFieldComponent,
    TextAreaFieldComponent,
    TextAreaFieldComponent,
  ],
  templateUrl: './new-post-form.component.html',
  styleUrl: './new-post-form.component.scss'
})


export class NewPostFormComponent implements OnInit {
  form!: FormGroup;
  urlIsEnabled = false;

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
      url: new FormControl(''),
    })
  }

  get titleControl(): FormControl {
    return this.form.get('title') as FormControl;
  }

  get contentControl(): FormControl {
    return this.form.get('content') as FormControl;
  }

  get urlControl(): FormControl {
    return this.form.get('url') as FormControl;
  }

  onSubmit() {
    console.log(this.form.value);
  }

  toggleUrl() {
    this.urlIsEnabled = !this.urlIsEnabled;
  }

}
