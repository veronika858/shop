import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../../product.service';
import {Subject, Subscription} from 'rxjs';
import {Product} from '../../shared/models/product';



@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products: Product[];
  filteredProducts: any[];
  subscription: Subscription;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor( private productService: ProductService) {
    this.subscription =  this.productService.getAll()
      .subscribe(products => {
        this.filteredProducts = this.products = products;
        this.dtTrigger.next();
      });
  }
ngOnInit(): void {
  this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 5,
    retrieve: true,
  };

}
ngOnDestroy(): void {
  if (this.subscription) {
  this.subscription.unsubscribe();
  this.dtTrigger.unsubscribe();
}
}

}
