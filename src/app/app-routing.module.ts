import { UserInfoComponent } from './components/user-info/user-info.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guard/auth.guard';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { LoginGuard } from './guard/login.guard';

const routes: Routes = [
  { path : '' , redirectTo : 'sign-in' , pathMatch : 'full'} ,
  { path : 'sign-in' , component : SignInComponent , canActivate : [LoginGuard] } ,
  { path : 'sign-up' , component : SignUpComponent , canActivate : [LoginGuard]}  ,
  { path : 'dashboard' , component : DashboardComponent , canActivate : [AuthGuard]} ,
  { path : 'new-user' , component : NewUserComponent , canActivate : [AuthGuard]} ,
  { path: 'update-user/:id' , component : UpdateUserComponent , canActivate : [AuthGuard]} ,
  { path: 'user-info/:id' , component : UserInfoComponent , canActivate : [AuthGuard]},
    { path: '**', redirectTo: 'sign-in' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes , {useHash : true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
