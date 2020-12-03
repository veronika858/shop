import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {ShoppingCartService} from './shopping-cart.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppingCart: ShoppingCartService) {
  }

  // tslint:disable-next-line:typedef
  public async placeOrder(order) {
    const result = await this.db.list('/orders').push(order);
    this.shoppingCart.clearCart();
    return result;
  }

  getOrders(): Observable<any> {
    return this.db.list<any>('/orders', ref => ref.orderByChild('datePlaced'))
      .snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const key = a.payload.key;
          const data = a.payload.val();
          return {key, ...data};
        })));
  }
  // tslint:disable-next-line:typedef
  public getOrdersByUserID(userId: string) {
    return this.db
      .list<any>('/orders', ref => ref.orderByChild('userId').equalTo(userId))
      .snapshotChanges().pipe(
        map(action =>
          action.map(a => {
            const key = a.payload.key;
            const data = a.payload.val();
            return {key, ...data};
          })
        )
      );
  }
  // tslint:disable-next-line:typedef
/*  getAllByUser(userId: string){
    // https://stackoverflow.com/questions/47129039/query-does-not-exist-in-type-queryfn-angularfire2
    return this.db.list<any>('/orders', ref => ref.orderByChild('userId').equalTo(userId)).snapshotChanges();
  }*/
}
