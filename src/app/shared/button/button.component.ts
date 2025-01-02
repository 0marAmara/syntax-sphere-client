import {Component, forwardRef, Input} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {BUTTON_STYLES, buttonStyleType} from './button-styles';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ButtonComponent),
      multi: true
    }
  ]
})
export class ButtonComponent {
  @Input() disabled: boolean=false;
  @Input() type?: string;
  @Input() styleVariant:buttonStyleType='default';


  get styles(): string {
    return BUTTON_STYLES[this.styleVariant];
  }

}
