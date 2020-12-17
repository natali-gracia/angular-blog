import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss'],
})
export class CreatePageComponent implements OnInit {
  form = new FormGroup({
    title: new FormControl(null, Validators.required),
    text: new FormControl(null, Validators.required),
    author: new FormControl(null, Validators.required),
  });

  constructor() {}

  ngOnInit(): void {}

  getErrorMessage(formControlName: 'title' | 'author' | 'text' | any) {
    if (this.form.get(formControlName)!.hasError('required')) {
      return 'You must enter a value!';
    }
    return;
  }

  enterSubmit($event: KeyboardEvent) {
    if ($event.key?.toLowerCase() !== 'enter') {
      return;
    }
    $event.preventDefault();
    this.onSubmit();
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    const post: Post = {
      title: this.form.value.title,
      text: this.form.value.text,
      author: this.form.value.author,
      date: new Date(),
    };

    console.log(post);
  }
}
