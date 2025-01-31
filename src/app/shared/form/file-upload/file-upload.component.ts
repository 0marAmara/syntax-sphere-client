import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-file-upload',
  imports: [ReactiveFormsModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {
  @Input() inputId!: string;
  @Input() label!: string;
  @Input() control = new FormControl();
  @Output() setFile = new EventEmitter<File>();

  onChange(event: any){
    const file:File = event.target.files[0];
    this.setFile.emit(file);
  }

}
