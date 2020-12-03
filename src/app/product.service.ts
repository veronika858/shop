import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Product} from './models/product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) {
  }

  // tslint:disable-next-line:typedef
  create(product) {
    return this.db.list('/products').push(product);
  }
  // tslint:disable-next-line:typedef
  update(productId, product){
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId): any{
    return this.db.object('/products/' + productId).remove();
  }
  getAll(): Observable<any[]> {
    return this.db.list('/products').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.val() as Product;
        const key = a.payload.key;
        return {key, ...data};
      })));
  }

  // tslint:disable-next-line:typedef
  getProduct(productId) {
    return this.db.object('/products/' + productId).snapshotChanges();
  }
}
