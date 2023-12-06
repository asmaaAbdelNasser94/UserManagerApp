import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _AngularFireAuth: AngularFireAuth) { }

  signIn(email: string, password: string) {
    return this._AngularFireAuth.signInWithEmailAndPassword(email, password);
  }

  signUp(email: string, password: string) {
    return this._AngularFireAuth.createUserWithEmailAndPassword(email, password);
  }
  logOut() {
    return this._AngularFireAuth.signOut();
  }
}
