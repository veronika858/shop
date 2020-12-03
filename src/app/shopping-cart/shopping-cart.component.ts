import { Component, OnInit } from '@angular/core';
import {ShoppingCartService} from '../shopping-cart.service';
import {Observable} from 'rxjs';
import {ShoppingCart} from '../models/shopping-cart';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
cart$: Observable<ShoppingCart>;
  constructor(public shoppingCart: ShoppingCartService) { }

  // tslint:disable-next-line:typedef
  public async ngOnInit() {
   return this.cart$ = await this.shoppingCart.getCart();
  }
  // tslint:disable-next-line:typedef
  public clearCart(){
    this.shoppingCart.clearCart();
  }
}
