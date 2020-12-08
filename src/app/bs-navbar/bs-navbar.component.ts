import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {AppUser} from '../shared/models/app-user';
import {ShoppingCartService} from '../shopping-cart.service';
import {Observable} from 'rxjs';
import {ShoppingCart} from '../shared/models/shopping-cart';

@Component({

  // tslint:disable-next-line:component-selector
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;

  constructor(public auth: AuthService, public shoppingCart: ShoppingCartService) {
  }

  // tslint:disable-next-line:typedef
  logout() {
    this.auth.logout();
  }


  // tslint:disable-next-line:typedef
  public async ngOnInit() {
    this.auth.appUsers$.subscribe(appUser => this.appUser = appUser);
    this.cart$ = await this.shoppingCart.getCart();

  }
}
