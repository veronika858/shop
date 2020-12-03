import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase';
import {Observable, of} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {AppUser} from './models/app-user';
import {switchMap} from 'rxjs/operators';
import {UserService} from './user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

/*  user$ = new Observable<firebase.User>();*/
 user$: Observable<firebase.User>;
  constructor(
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router) {
      this.user$ = afAuth.authState;
  }
  // tslint:disable-next-line:typedef
  login(){
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }
  // tslint:disable-next-line:typedef
  logout(){
    this.afAuth.signOut();
    this.router.navigate(['/']);
    /*this.afAuth.authState.subscribe(x => console.log(x));*/
  }

  get appUsers$(): Observable<AppUser> {
    return this.user$.pipe(
      switchMap(user => {
        if (user) {
          return this.userService.get(user.uid);
        }
        return of(null);

      }));
  }

}
