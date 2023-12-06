import { UsersService } from './../../services/users.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {
  hide = true;
  newUserForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^201[0-2,5]{1}[0-9]{8}$/g), Validators.maxLength(11)]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)])
  })
  constructor(private _UsersService: UsersService,
    private _AuthService: AuthService,
    private _ToastrService: ToastrService,
    private _Router: Router) { }

  getUserNameErrorMessage() {
    if (this.newUserForm.controls['name'].hasError('required')) {
      return 'You must enter a value';
    }
    return;
  }

  getEmailErrorMessage() {
    if (this.newUserForm.controls['email'].hasError('required')) {
      return 'You must enter a value';
    }
    return this.newUserForm.controls['email'].hasError('email') ? 'Not a valid email' : '';
  }

  getUserPhoneErrorMessage() {
    if (this.newUserForm.controls['phone'].hasError('required')) {
      return 'You must enter a value';
    }
    if (this.newUserForm.controls['phone'].hasError('pattern')) {
      return 'ex. 201xxxxxxxxx';
    }
    return;
  }

  getPasswordErrorMessage() {
    if (this.newUserForm.controls['password'].hasError('required')) {
      return 'You must enter a value';
    }
    return;
  }

  signUp(newUserForm: FormGroup) {
    const email = newUserForm.controls['email'].value;
    const password = newUserForm.controls['password'].value;
    if (newUserForm.valid) {
      this._AuthService.signUp(email , password).then(() => { // create user in auth
        this.cretaeUser(newUserForm.value); // create user in firestore
        if (!localStorage.getItem('userToken')) {
          this._ToastrService.success('Success Sign Up !')
          this._Router.navigate(['/sign-in'])
        } else {
          this._ToastrService.success('New User Created !')
          this._Router.navigate(['/dashboard'])
        }
      }).catch(error => {
        this._ToastrService.error(error.message)
        newUserForm.reset();
      })
    }
  }

  cretaeUser(newUser: User) {
    this._UsersService.createUser(newUser)
  }
}
