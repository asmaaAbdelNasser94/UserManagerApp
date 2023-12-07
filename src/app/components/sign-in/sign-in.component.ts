import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  hide = true;
  signInForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)])
  })
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _ToastrService: ToastrService
  ) { }

  getEmailErrorMessage() {
    if (this.signInForm.controls['email'].hasError('required')) {
      return 'You must enter a value';
    }
    return this.signInForm.controls['email'].hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    if (this.signInForm.controls['password'].hasError('required')) {
      return 'You must enter a value';
    }
    return;
  }

  signIn(signInForm: FormGroup) {
    const email = signInForm.controls['email'].value;
    const password = signInForm.controls['password'].value;

    if (signInForm.valid) {
      this._AuthService.signIn(email, password).then(() => {
        localStorage.setItem('userToken', 'true')
        this._ToastrService.success('Success Sign in !')
        this._Router.navigate(['/dashboard']);
      }).catch(error => {
        this._ToastrService.error(error.code)
        signInForm.reset();
      })
    }
  }
}
