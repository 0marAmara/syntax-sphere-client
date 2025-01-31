import {Component, inject, OnInit} from '@angular/core';
import {TextAreaFieldComponent} from '@shared/form/text-area-field/text-area-field.component';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ButtonComponent} from '@shared/button/button.component';
import {InputFieldComponent} from '@shared/form/input-field/input-field.component';
import {PostsService} from '@core/services';
import {FileUploadComponent} from '@shared/form/file-upload/file-upload.component';

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
    FileUploadComponent,
  ],
  templateUrl: './new-post-form.component.html',
  styleUrl: './new-post-form.component.scss'
})


export class NewPostFormComponent implements OnInit {
  postsService = inject(PostsService);
  form!: FormGroup;
  urlIsEnabled = false;
  image?:File;

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(4)]),
      content: new FormControl('', [Validators.required, Validators.minLength(10)]),
      image: new FormControl('', []),
      url: new FormControl('', [Validators.pattern('^(https?:\/\/)?([^\s\/$.?#]+\.)+[^\s\/$.?#]+[^\s]*$')]),
    })
  }

  setImage(image: File) {
    this.image = image;
  }

  get titleControl(): FormControl {
    return this.form.get('title') as FormControl;
  }

  get contentControl(): FormControl {
    return this.form.get('content') as FormControl;
  }

  get imageControl(): FormControl {
    return this.form.get('image') as FormControl;
  }

  get urlControl(): FormControl {
    return this.form.get('url') as FormControl;
  }

  onSubmit() {
    const formData = new FormData();

    formData.append('title', this.form.value.title);
    formData.append('content', this.form.value.content);

    if (this.form.value.url) {
      formData.append('url', this.form.value.url);
    }

    if (this.image) {
      formData.append('image', this.image);
    }

    this.postsService.addPost(formData).subscribe(() => {
      this.postsService.loadPosts();
      this.form.reset();
      this.urlIsEnabled = false;
    });
  }

  toggleUrl() {
    this.urlIsEnabled = !this.urlIsEnabled;
  }

}
