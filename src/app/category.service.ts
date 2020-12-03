import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) {
  }
  // tslint:disable-next-line:typedef
  getCategories() {
    return this.db.list('/categories', ref => ref.orderByChild('name')).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => ({
          key: a.payload.key, ...a.payload.val() as {}
          })
        ); }
      )
    );
  }


}
