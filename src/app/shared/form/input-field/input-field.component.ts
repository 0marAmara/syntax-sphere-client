import {Component, Input} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {FORM_FIELD_TYPES, formFieldStyleType} from './input-field-styles';

@Component({
  selector: 'app-input-field',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.scss'
})
export class InputFieldComponent {
  @Input() inputId!: string;
  @Input() label!: string;
  @Input() control = new FormControl();
  @Input() inpType = 'text';
  @Input() placeholder?: string;
  @Input() styleType: formFieldStyleType = 'default';

  ERROR_MESSAGES: Record<string, string> = {
    required: `This field is required`,
    email: `The email field is invalid`,
    minlength: `This field is too short`,
    pattern: `This URL is not valid`
  }

  get isError() {
    return !this.control.valid && this.control.touched && this.control.dirty;
  }

  get inpStyle(): string {
    return FORM_FIELD_TYPES[this.styleType].input[this.isError ? 'error' : 'normal'];
  }

  get labelStyle(): string {
    return FORM_FIELD_TYPES[this.styleType].label[this.isError ? 'error' : 'normal'];
  }

  get errorMessages(): string[] {
    const errors: string[] = []
    if (this.control.errors != null)
      for (const error in this.control.errors) {
        errors.push(this.ERROR_MESSAGES[error]);
      }
    return errors;
  }

}
