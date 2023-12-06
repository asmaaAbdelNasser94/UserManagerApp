import { UsersService } from 'src/app/services/users.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent {
  hide = true;
  userId : string = '';
  user : any ;
  userForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^201[0-2,5]{1}[0-9]{8}$/g), Validators.maxLength(11)]),
  })
  constructor(private _UsersService: UsersService, private _ActivatedRoute: ActivatedRoute ,
    private _Router : Router){}

  ngOnInit(): void {
    this.userId = this._ActivatedRoute.snapshot.params["id"];
    this._UsersService.getUserInfo(this.userId).subscribe((data : any)=>{
      this.user = data.data();
      this.userForm.controls['name'].setValue(this.user.name);
      this.userForm.controls['phone'].setValue(this.user.phone);
    })
  }

  getUserNameErrorMessage() {
    if (this.userForm.controls['name'].hasError('required')) {
      return 'You must enter a value';
    }
    return;
  }

  getUserPhoneErrorMessage() {
    if (this.userForm.controls['phone'].hasError('required')) {
      return 'You must enter a value';
    }
    if (this.userForm.controls['phone'].hasError('pattern')) {
      return 'ex. 201xxxxxxxxx';
    }
    return;
  }

  updateUserInfo(data: any) {
    this._UsersService.updateUserInfo(data, this.userId).then(() => {
      this._Router.navigate(['/dashboard'])
    })
  }
}
