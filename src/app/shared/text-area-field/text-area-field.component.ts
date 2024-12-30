import {Component, forwardRef, Input} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-text-area-field',
  imports: [],
  templateUrl: './text-area-field.component.html',
  styleUrl: './text-area-field.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TextAreaFieldComponent),
    multi: true
  }]
})
export class TextAreaFieldComponent {
  @Input() label!: string;
  @Input() for!: string;
  @Input() placeholder: string = '';
  @Input() name!: string;
  @Input() formControlName?: string;
  @Input() error: boolean = false;
  @Input() errorMsg?: string;
  @Input() minLength: number = 0;

  value: any = '';
  disabled = false;

  get inpStyle(): string {
    return this.error
      ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
      : 'block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500';
  }

  get labelStyle(): string {
    return this.error
      ? 'block mb-2 text-sm font-medium text-red-700 dark:text-red-500'
      : 'block mb-2 text-sm font-medium text-gray-900 dark:text-white';
  }

  // Function to call when the value changes
  onChange = (value: any) => {
  };

  // Function to call when the input is touched
  onTouched = () => {
  };

  writeValue(value: any): void {
    this.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleInputChange(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.value = inputValue;
    this.onChange(inputValue);
  }
}
