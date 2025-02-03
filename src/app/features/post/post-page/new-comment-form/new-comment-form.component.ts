import {Component, inject, input} from '@angular/core';
import {FormControl, FormGroup, FormsModule, Validators} from "@angular/forms";
import {TextAreaFieldComponent} from "@shared/form/text-area-field/text-area-field.component";
import {CommentsService} from '@services/comments.service';
import {ButtonComponent} from '@shared/button/button.component';

@Component({
  selector: 'app-new-comment-form',
  imports: [
    FormsModule,
    TextAreaFieldComponent,
    ButtonComponent
  ],
  templateUrl: './new-comment-form.component.html',
  styleUrl: './new-comment-form.component.scss'
})
export class NewCommentFormComponent {
  postId = input<string>();

  commentsService = inject(CommentsService)
  form: FormGroup = new FormGroup({
    comment: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  get commentControl(): FormControl {
    return this.form.get('comment') as FormControl;
  }

  onSubmit() {
    this.commentsService.addComment(this.form.value, this.postId()!).subscribe({
      next: () => {
        this.commentsService.loadComments(this.postId()!);
        this.form.reset();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
