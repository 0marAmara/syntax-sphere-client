import {Component, Input} from '@angular/core';
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {TEXT_AREA_FIELD_TYPES, textAreaFieldStyleType} from './text-area-field-styles';

@Component({
  selector: 'app-text-area-field',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './text-area-field.component.html',
  styleUrl: './text-area-field.component.scss'
})
export class TextAreaFieldComponent {
  @Input() label!: string;
  @Input() control: FormControl = new FormControl();
  @Input() inputId!: string;
  @Input() placeholder!: string;
  @Input() styleType: textAreaFieldStyleType = 'default';

  ERROR_MESSAGES: Record<string, string> = {
    required: `This field is required`,
  }

  get isError() {
    return !this.control.valid && this.control.touched && this.control.dirty;
  }

  get inpStyle(): string {
    return TEXT_AREA_FIELD_TYPES[this.styleType].input[this.isError ? 'error' : 'normal'];
  }

  get labelStyle(): string {
    return TEXT_AREA_FIELD_TYPES[this.styleType].label[this.isError ? 'error' : 'normal'];
  }

  get errorMessages(): string[] {
    const errors: string[] = []
    if (this.control.errors != null)
      for (const error in this.control.errors) {
        console.log(error);
        errors.push(this.ERROR_MESSAGES[error]);
      }
    return errors;
  }

}
