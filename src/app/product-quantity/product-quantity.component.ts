import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../models/product';
import {ShoppingCartService} from '../shopping-cart.service';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {

  @Input('product') product: Product;
  @Input('shopping-cart') ShoppingCart;

  constructor(private cartService: ShoppingCartService) {
  }

  /* add product to the shopping cart*/
  // tslint:disable-next-line:typedef
  addToCart() {
    this.cartService.addToCart(this.product);
  }
  // tslint:disable-next-line:typedef
  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }

  ngOnInit(): void {
  }

}
