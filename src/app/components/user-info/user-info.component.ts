import { UsersService } from 'src/app/services/users.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent {

  userId: string = '';
  user: any;

  constructor(private _UsersService: UsersService,
    private _ActivatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.userId = this._ActivatedRoute.snapshot.params["id"];
    this._UsersService.getUserInfo(this.userId).subscribe((data: any) => {
      this.user = data.data();
    })
  }

}
