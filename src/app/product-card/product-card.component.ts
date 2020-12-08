import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../shared/models/product';
import {ShoppingCartService} from '../shopping-cart.service';
import {ShoppingCart} from '../shared/models/shopping-cart';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input('product') product: Product;
  @Input('shopping-cart') ShoppingCart: ShoppingCart;

  constructor(private cartService: ShoppingCartService) {
  }

  /* add product to the shopping cart*/
  // tslint:disable-next-line:typedef
  addToCart() {
    this.cartService.addToCart(this.product);
  }


  ngOnInit(): void {
  }

}
