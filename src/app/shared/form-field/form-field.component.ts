import {Component, Input, Output, EventEmitter} from '@angular/core';
import {FormsModule, NgModel} from '@angular/forms';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  imports: [
    FormsModule
  ],
  styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent {
  @Input() label!: string;
  @Input() for!: string;
  @Input() inpType: string = 'text';
  @Input() placeholder: string = '';
  @Input() name!: string;
  @Input() required: boolean = false;
  @Input() minlength!: number;
  @Input() class: string = '';
  @Input() pattern?: string;
  @Input() email?: boolean = false;


  style = "overflow-hidden bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500" +
    " focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";


}
