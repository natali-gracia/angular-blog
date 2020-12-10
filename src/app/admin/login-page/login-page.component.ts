import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor() {}

  ngOnInit(): void {}

  emailErrorMessage() {
    if (this.form.get('email').hasError('email')) {
      return 'Incorrect Email format.';
    }
  }

  passwordErrorMessage() {
    if (this.form.get('password').hasError('minlength')) {
      return 'Password must contain min 6 symbols';
    }
  }

  getErrorMessage(formControlName: 'email' | 'password') {
    if (this.form.get(formControlName).hasError('required')) {
      return 'You must enter a value!';
    }
    return this[`${formControlName}ErrorMessage`]();
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

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
    };

    console.log('User Data:', user);

    this.form.reset();
  }
}
