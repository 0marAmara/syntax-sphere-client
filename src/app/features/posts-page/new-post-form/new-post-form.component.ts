import {Component, inject, OnInit} from '@angular/core';
import {TextAreaFieldComponent} from '../../../shared/form/text-area-field/text-area-field.component';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ButtonComponent} from '../../../shared/button/button.component';
import {InputFieldComponent} from '../../../shared/form/input-field/input-field.component';
import {PostsService} from '../../../core/services/posts.service';
import {PostElement} from '../../../shared/models/post.model';

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
  postsService = inject(PostsService);
  form!: FormGroup;
  urlIsEnabled = false;

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(4)]),
      content: new FormControl('', [Validators.required, Validators.minLength(10)]),
      url: new FormControl('', [Validators.pattern('https?:\/\/(?:www\.)?[^\s\/$.?#].[^\s]*'),]),
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
    const newPost: PostElement = {
      title: this.form.value.title,
      content: this.form.value.content,
    }
    if (this.form.value.url) {
      newPost.url = this.form.value.url;
    }
    this.postsService.addPost(newPost).subscribe(() => {
      this.postsService.loadPosts();
      this.form.reset();
      this.urlIsEnabled = false;
    });
  }

  toggleUrl() {
    this.urlIsEnabled = !this.urlIsEnabled;
  }

}
