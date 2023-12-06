import { User } from './../model/user';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private _AngularFirestore: AngularFirestore) { }

  getAllUsers() {
    return this._AngularFirestore.collection('/Users').snapshotChanges();
  }

  createUser(userData: User) {
    userData.id = this._AngularFirestore.createId();
    return this._AngularFirestore.collection('/Users').add(userData);
  }


  deleteUser(userId: string) {
    return this._AngularFirestore.doc('/Users/' + userId).delete();
  }

  getUserInfo(userId: string) {
    return this._AngularFirestore.doc('/Users/' + userId).get();
  }

  updateUserInfo(data : any , userId : string) {
    return this._AngularFirestore.doc('/Users/' + userId).update(data);
  }


}
