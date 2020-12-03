import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {CanActivate} from '@angular/router';
import {map} from 'rxjs/operators';
import {AppUser} from './models/app-user';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate{

  constructor(private auth: AuthService) { }

  canActivate(): Observable<boolean> {
    return this.auth.appUsers$.pipe(map((appUser: AppUser) => appUser.isAdmin));
  }
}
