import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isLogin: boolean = false;
  constructor(private _AuthService: AuthService,
    private _Router: Router) { }

  ngOnInit(): void {
    this._Router.events.subscribe(() => {
      if (localStorage.getItem('userToken')) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    })
  }
  logout() {
    this._AuthService.logOut().then(() => {
      localStorage.removeItem('userToken');
      this._Router.navigate(['/sign-in'])
    })
  }
}
