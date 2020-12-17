import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces';
import { AuthService } from '../shared/services/auth.service';

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
  submitted = false;
  message!: string;

  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['loginAgain']) {
        this.message = 'Please, authentification!';
      }
    });
  }

  emailErrorMessage() {
    if (this.form.get('email')!.hasError('email')) {
      return 'Incorrect Email format.';
    }
    return;
  }

  passwordErrorMessage() {
    if (this.form.get('password')!.hasError('minlength')) {
      return 'Password must contain min 6 symbols';
    }
    return;
  }

  getErrorMessage(formControlName: 'email' | 'password' | any) {
    if (this.form.get(formControlName)!.hasError('required')) {
      return 'You must enter a value!';
    }

    return (formControlName = 'email'
      ? this.emailErrorMessage()
      : this.passwordErrorMessage());
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

    this.submitted = true;

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
    };

    this.auth.login(user).subscribe(
      () => {
        this.form.reset();
        this.router.navigate(['/admin', 'dashboard']);
        this.submitted = false;
      },
      () => {
        this.submitted = false;
      }
    );
  }
}
