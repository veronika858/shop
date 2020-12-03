import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ShoppingCart} from '../models/shopping-cart';
import {Subscription} from 'rxjs';
import {OrderService} from '../order.service';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {Order} from '../models/order';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: ShoppingCart;
  shipping = {};
  subscription: Subscription;
  userId: string;
  constructor(private order: OrderService, private authService: AuthService,
              public router: Router) { }

  // tslint:disable-next-line:typedef
  async placeOrder() {
    console.log(this.shipping);
    const order = new Order(this.userId, this.shipping, this.cart);
    const result = await this.order.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }

  async ngOnInit(): Promise<void> {
    this.subscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
