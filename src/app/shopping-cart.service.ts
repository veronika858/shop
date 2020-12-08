import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Product} from './shared/models/product';
import {map, take} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ShoppingCart} from './shared/models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) {
  }

  // tslint:disable-next-line:typedef
  private create() {
    return this.db.list('/shopping-carts').push({dateCreated: new Date().getTime()});
  }

  public async getCart(): Promise<Observable<ShoppingCart>> {// to read cartId from firebase
    const cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).snapshotChanges().pipe(map((result: any) => {
      const key = result.key;
      const items = key ? result.payload.val().items : {};
      return new ShoppingCart(items);
    }));
  }
  // tslint:disable-next-line:typedef
  public async clearCart(){
    const cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }
  // tslint:disable-next-line:typedef
  private async getOrCreateCartId(): Promise<string> {   // to create a cardId or access the cardId
    const cartId = localStorage.getItem('cardId');
    if (cartId) {
      return cartId;
    } else {
      const result = await this.create();   // here we call create method to create a cartid and store it in local storage
      localStorage.setItem('cardId', result.key);
      return result.key;
    }
  }

  // tslint:disable-next-line:typedef
  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }


  // tslint:disable-next-line:typedef
   private async updateItemQuantity(product: Product, change) {    // here we add the cart to firebase
     const cartId = await this.getOrCreateCartId();
     console.log(cartId);
     const item$ = this.getItem(cartId, product.key);
     console.log(item$);
     item$.snapshotChanges().pipe(take(1)).subscribe(item => {
       console.log(item.payload.val());
       if (item.payload.val()) {
         // @ts-ignore
         const quantity = (item.payload.val().quantity) + change;
         quantity === 0 ? item$.remove() : item$.update({quantity});
       } else {
         item$.set({product, quantity: 1});
       }
     });
   }

  // tslint:disable-next-line:typedef
   public addToCart(product: Product){
    this.updateItemQuantity(product, 1);
   }
  // tslint:disable-next-line:typedef
   public removeFromCart(product: Product){
    this.updateItemQuantity(product, -1);
   }

}
