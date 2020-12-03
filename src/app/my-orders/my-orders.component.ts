import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from '../order.service';
import {AuthService} from '../auth.service';
import {switchMap} from 'rxjs-compat/operator/switchMap';
import {map, switchAll} from 'rxjs/operators';
import {Order} from '../models/order';
import {Observable, Subscription} from 'rxjs';
import {UserService} from '../user.service';
import {User} from 'firebase';


@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit{
  orders$;
  constructor(
    public order: OrderService,
    public auth: AuthService,
    public user: UserService) {
  }

  ngOnInit(): any {
    /*this.orders$ = this.auth.user$.pipe(switchMap(u => {
      return this.order.getOrdersByUserID(u.uid);
    }));
    console.log(this.orders$);*/
  }


  /*or*/
  // tslint:disable-next-line:typedef
 /*ngOnInit(): any{
    this.orders$ = this.auth.user$.
      .pipe(
        switchMap(user => {
          return this.order.getOrdersByUserID(user.key);
          }
        )
      );

    this.subscription = this.orders$.subscribe(order => {
      this.orders = order;
    });
  }

  // tslint:disable-next-line:typedef
    ngOnDestroy() {
      this.subscription.unsubscribe();
    }
*/

  }
