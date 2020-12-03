import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireObject} from '@angular/fire/database';
import * as firebase from 'firebase';
import {Observable, ObservableInput} from 'rxjs';
import {AppUser} from './models/app-user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) {
  }
  // tslint:disable-next-line:typedef
  save(user: firebase.User) {
    this.db.object('/user/' + user.uid)
      .update({name: user.displayName, email: user.email})
      .then(() => console.log('user saved successfully'))
      .catch((reason: any) => console.log('user save failed', reason));
  }

  get(uid: string): Observable<AppUser> {
    return this.db.object('/user/' + uid).valueChanges() as Observable<AppUser>;
  }
}
