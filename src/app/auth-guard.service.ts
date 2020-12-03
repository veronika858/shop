import { Injectable } from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private auth: AuthService, private router: Router) { }

  // tslint:disable-next-line:typedef
  canActivate(route, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.user$.pipe(map(user => { /*we call the map operator. we transform this observable from a user object into a boolean. Angular internally subscribes to this observable and then removes the subscription later. And finally we need to return the result of this mapping.*/
      if (user) {
        return true;
      } else {
        this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}}); /*RouterStateSnapshot - with this parameter we can get the url that the user tried to access when the AUTH-Guard kicked in. We call the navigator method, the second argument is a navigation extra object*/
        return false;
      }
    }));
  }
}
