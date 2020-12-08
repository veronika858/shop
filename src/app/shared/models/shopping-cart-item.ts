import {Product} from './product';

export class ShoppingCartItem {
  constructor(public  product: Product, public quantity: number){}
  // tslint:disable-next-line:typedef
  get totalPrice(){
    return this.product.price * this.quantity;
  }
}
