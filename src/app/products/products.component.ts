import {Component, OnInit} from '@angular/core';
import {ProductService} from '../product.service';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../shared/models/product';
import {switchMap} from 'rxjs/operators';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {ShoppingCartService} from '../shopping-cart.service';
import {Observable} from 'rxjs';
import {ShoppingCart} from '../shared/models/shopping-cart';
registerLocaleData(localeFr, 'fr');

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  products: Product[] = [];
  category: string;
  filteredProducts: Product[] = [];
  cart$: Observable<ShoppingCart>;

  constructor(private route: ActivatedRoute, private productService: ProductService, private shoppingCart: ShoppingCartService) {}


// tslint:disable-next-line:typedef
  public async ngOnInit() {
    this.cart$ = await this.shoppingCart.getCart();
    this.populateProducts();
  }

  // tslint:disable-next-line:typedef
  private populateProducts(){
    this.productService.getAll().pipe(switchMap(products => {
      this.products = products;
      console.log(this.products);
      return this.route.queryParamMap;
    }))
      .subscribe(params => {
        this.category = params.get('category');
        console.log(this.category);

        this.applyFilter();
      });
  }
  // tslint:disable-next-line:typedef
  private applyFilter(){
    this.filteredProducts = (this.category) ?
      this.products.filter(p => p.category === this.category) : this.products;
    console.log(this.filteredProducts);
  }


}
